const CryptoJS = require('crypto-js');

const SecretStart = (password) =>{
    const hasPasw = CryptoJS.SHA256(password).toString();
    console.log(`Password hash: ${hasPasw}`);
    return hasPasw;
}
    

const MiddleSecret = (password) =>{
    return {pas: CryptoJS.AES.encrypt(password, key).toString(), key: key}
}

const SecretLast = (password) =>{
    return encodeURIComponent(password);
}

const Keygen = () =>{
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()-_=+';

    let rand = Math.floor(Math.random() * (60 - 40 + 1) + 40);

    let password = '';
    for(let i = 0; i < rand; i++){
        const randomSet = Math.floor(Math.random() * 4);
        let randomChar = '';

        switch(randomSet){
            case 0:
                randomChar = uppercase[Math.floor(Math.random() * uppercase.length)];
                break;
            case 1:
                randomChar = lowercase[Math.floor(Math.random() * lowercase.length)];
                break;
            case 2:
                randomChar = numbers[Math.floor(Math.random() * numbers.length)];
                break;
            case 3:
                randomChar = symbols[Math.floor(Math.random() * symbols.length)];
                break;
        }
        password += randomChar;
    }

    return password;
}

const CreatePassword = (password) =>{
    const hashPassword = SecretStart(password);
    const {pas, key} = MiddleSecret(hashPassword);
    const lasPas = SecretLast(pas);
    console.log(`Password: ${lasPas}\nKey: ${key}`);
    return lasPas; // Возвращаем зашифрованный пароль
}

const DecriptPassword = (password, key) => {
    const hasPasw = CryptoJS.AES.decrypt(decodeURIComponent(password), key).toString(CryptoJS.enc.Utf8);
    console.log(`Decrypt password hash: ${hasPasw}`);
    return hasPasw;
}
const key = Keygen();
const password = "12345";
const enc_pas = CreatePassword(password); // Получаем зашифрованный пароль
DecriptPassword(enc_pas, key); // Расшифровываем пароль