"use strict";
const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');
const keys = require('../config/keys');
let transporter = nodemailer.createTransport({
    host: keys.smtpServer,
    port: 587,
    secure: false,
    auth: {
        user: keys.userSmtp,
        pass: keys.passSmtp
    }
});

function confirm(data, done) {
    console.log(data)
    var mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Happyland',
            link: 'https://www.happyland.com.pe/',
            logo: 'https://www.happyland.com.pe/wp-content/themes/myhappyland/images/logo.svg'
        }
    });

    let email = {
        body: {
            greeting: 'Código de validación - Happyland',
            title: 'Registro exitoso en Happyland Adventure!',
            signature: 'Registro exitoso!',
            intro: ['Bienvenido, disfrute Happyland Adventure'],
            outro: 'Su código de validación es:' + ' ' + data.message
        }

    };
    let emailBody = mailGenerator.generate(email);
    let emailText = mailGenerator.generatePlaintext(email);
    let emailOptions = {
        from: '"Happyland" <noreply@happyland.com.pe>',
        to: data.email,
        subject: "Código de validación - Happyland",
        text: emailText,
        html: emailBody

    }

    transporter.sendMail(emailOptions, function (error, info) {
        if (error) {
            console.log(error);
            done(error);
        } else {
            console.log('Message sent: ' + info.response);
            done(null, {
                cod: 1,
                msg: "Mensaje enviado correctamente"
            });
        }
    });
}
module.exports = {
    confirm
}


