const express = require('express');
const cors = require('cors'); // Добавьте эту строку
const fs = require('fs');
const path = require('path');
//const crypto = require('crypto');

const app = express();
const port = 3000;

// const cipher = crypto.createCipher('aes192', 'a password');
// let encrypted = cipher.update('Hello, world', 'utf8', 'hex');
// encrypted += cipher.final('hex');
// console.log(encrypted);

let user = {
    login: '',
    id: ''
}

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src 'self' http://localhost:3000; script-src 'self' http://localhost:3000; connect-src 'self' http://localhost:3000; img-src 'self' http://localhost:3000; style-src 'self' 'unsafe-inline' http://localhost:3000; font-src 'self' http://localhost:3000;");
    next();
});

app.post('/login', (req, res) => {
    let data = require('./files/users.json');
    const users = data.users;
    const { email, passwrd } = req.body;
    console.log(`User's email: ${email}.\nUser's password: ${passwrd}`);

    const userObject = users.find(user => user[email] && user[email].passwrd === passwrd);

    if (userObject) {
        const userInfo = userObject[email];
        user.login = userInfo.username;
        user.id = userInfo.id;
        console.log(user);
        res.status(200).send(user);
        console.log(userInfo);
    }
    else {
        res.status(404).json(null);
    }
});

// app.get('/playlist/musicday', (req, res) => {
//     const user_id = req.body;
//     //let musicPlaylist = path.join(__dirname, 'files/playlist/day', user);
//     let data = require('./files/playlist/daysongs.json');
//     const users = data.id;
//     const music_pl = users.find(id => id[user_id]);
//     //const user_playlist = playlist.id
//     if(music_pl){
//         console.log(music_pl);
//         res.status(200).send(music_pl);
//     }
//     else{
//         res.status(404).json(null);
//     }
// });

app.get('/playlist', (req, res) => {
    let playlistId = req.query.pl;

    console.log(`/playlist?pl=${playlistId}`);

    let data = require('./files/playlist/daysongs.json');

    let playlist = data.id[playlistId];

    console.log(playlist);

    if (playlist) {
        // Отправляем данные плейлиста пользователю
        res.status(200).json(playlist);
        console.log("/playlist нашёл плейлист");
    } 
    else {
        // Если плейлист не найден, отправляем сообщение об ошибке
        res.status(404).json(null);
        console.log("Ошибка /playlist запроса");
    }
});


app.post('/register', (req, res) => {
    let data = require('./files/users.json');
    const users = data.users;
    const { nickname, email, passwrd } = req.body;
    console.log(`User's email: ${email}.\nUser's nickname: ${nickname}\nUser's password: ${passwrd}`);

    const userObject = users.find(user => user[email] && user[email].passwrd === passwrd);
    const filePath = './files/users.json';

    if (!userObject) {
        const id = Math.floor(Math.random() * 1000000000);

        const newUser = {
            [email]: [
                {
                    id: id,
                    username: nickname,
                    email: email,
                    passwrd: passwrd
                }
            ]
        };
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Ошибка при чтении файла:', err);
                return;
            }

            // Разбор существующих данных
            const jsonData = JSON.parse(data);
            jsonData.users.push(newUser);

            // Запись обновленных данных обратно в файл
            fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Ошибка при записи в файл:', err);
                } else {
                    console.log('Новый пользователь успешно добавлен.');
                }
            });
        });
        res.status(200).json(null);
        console.log(userInfo);
    }
    else {
        res.status(404).json(null);
    }
});

app.post('/recovery', (req, res) => {
    let data = require('./files/users.json');
    const users = data.users;
    const { email } = req.body;
    console.log(`Recovery: ${email}`);

    const recoveryUser = users.find(user => user[email]);
    if (recoveryUser) {
        console.log(email);
        res.status(200).json(null);
    }
    else {
        res.status(404).json(null);
        console.log("Error");
    }
});

app.get('/music/:filename', (req, res) => {
    const filename = req.params.filename;
    const validFiles = ['1.m3u8', '10.ts', '11.ts', '12.ts', '13.ts', '14.ts', '15.ts', '16.ts', '17.ts', '18.ts', '19.ts', '110.ts', '111.ts', '112.ts', '113.ts', '114.ts', '115.ts', '116.ts', '117.ts', '118.ts', '119.ts', '120.ts', '121.ts', '122.ts', '123.ts', '124.ts', '125.ts'];

    if (validFiles.includes(filename)) {
        let filePath = path.join(__dirname, 'files/songs/test_song', filename);
        res.sendFile(filePath);
    } else {
        res.status(404).send('Файл не найден');
    }
});

app.get('/img/:userid', (req, res) => {
    const filename = req.params.userid;
    const validFiles = ['1.m3u8', '10.ts', '11.ts', '12.ts', '13.ts', '14.ts', '15.ts', '16.ts', '17.ts', '18.ts', '19.ts', '110.ts', '111.ts', '112.ts', '113.ts', '114.ts', '115.ts', '116.ts', '117.ts', '118.ts', '119.ts', '120.ts', '121.ts', '122.ts', '123.ts', '124.ts', '125.ts'];

    if (validFiles.includes(filename)) {
        let filePath = path.join(__dirname, 'files/songs/test_song', filename);
        res.sendFile(filePath);
    } else {
        res.status(404).send('Файл не найден');
    }
});

app.get('/onesong/:filename', (req, res) => {
    const filename = req.params.filename;
    const validFiles = ['1.aac'];

    if (validFiles.includes(filename)) {
        let filePath = path.join(__dirname, 'files/songs/test_song', filename);
        res.sendFile(filePath);
    } else {
        res.status(404).send('Файл не найден');
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
