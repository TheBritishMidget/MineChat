const mineflayer = require('mineflayer');
const inquirer = require('inquirer');
const chalk = require('chalk');

inquirer.prompt([{
        type: 'list',
        name: 'ClientType',
        message: 'Is the account you want to connect with PREMIUM or CRACKED?',
        choices: [
            'Cracked',
            'Premium'
        ]
    },
    {
        type: 'input',
        name: 'Username',
        message: 'Enter the username you wish to use:'
    },
    {
        type: 'input',
        name: 'Password',
        message: 'Enter the password of your account (leave blank if using CRACKED client):'
    },
    {
        type: 'input',
        name: 'ServerIP',
        message: 'Enter the server IP (eg. 1.1.1.1):'
    },
    {
        type: 'input',
        name: 'ServerPort',
        message: 'Enter the server port (normally: 25565):'
    }
    ]).then(answers => {

        const ClientType = answers.ClientType;
        const Username = answers.Username;
        const Password = answers.Password;
        const ServerIP = answers.ServerIP;
        const ServerPort = answers.ServerPort;


        if (ClientType === 'Premium') {
            
            let client = mineflayer.createBot({
                host: ServerIP,
                port: ServerPort,       
                username: Username,
                password: Password,
            });

            
            client.on('chat', (username, message) => {
                if (username == 'you') return;

                console.log(`[${username}] ${message}`);
            });
            

            client.on('whisper', (username, message) => {
                console.log(`${username} whispered to you: ${message}`);
            });

            client.on('nonSpokenChat', (message) => {
                console.log(message);
            });

            client.on('playerJoined', (player) => {
                console.log(chalk.yellowBright(`${player.username} joined the game`));
            });

            client.on('playerLeft', (player) => {
                console.log(chalk.yellowBright(`${player.username} left the game.`));
            });

            client.on('death', () => {
                console.log('The bot was killed and has been respawned');
            });

            client.on('kicked', (reason) => {
                let kickReason = JSON.parse(reason);
                let kickText = kickReason.text;

                console.log(chalk.red(`You where kicked for: ${kickText}`));
                client.end();
                console.log(chalk.red('You must now reload the bot'));
            });

            client.on('error', err => console.log(err));

        } else {

            let client = mineflayer.createBot({
                host: ServerIP,
                port: ServerPort,       
                username: Username,
            });

            
            client.on('chat', (username, message, jsonMsg) => {
                if (username == 'you') return;

                console.log(`[${username}] ${message}`);
            });
            

            client.on('whisper', (username, message) => {
                console.log(`${username} whispered to you: ${message}`);
            });

            client.on('nonSpokenChat', (message) => {
                console.log(message);
            });

            client.on('playerJoined', (player) => {
                console.log(chalk.yellowBright(`${player.username} joined the game.`));
            });

            client.on('playerLeft', (player) => {
                console.log(chalk.yellowBright(`${player.username} left the game.`));
            });

            client.on('death', () => {
                console.log('The bot was killed and has been respawned');
            });

            client.on('kicked', (reason) => {
                let kickReason = JSON.parse(reason);
                let kickText = kickReason.text;

                console.log(chalk.red(`You where kicked for: ${kickText}`));
                client.end();
                console.log(chalk.red('You must now reload the bot'));
            });

            client.on('error', err => console.log(err));

        };


});

