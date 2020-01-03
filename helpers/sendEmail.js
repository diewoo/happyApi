"use strict";
const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');
const keys = require('../config/keys');
// let transporter = nodemailer.createTransport({
//     host: keys.smtpServer,
//     port: 587,
//     secure: false,
//     auth: {
//         user: keys.userSmtp,
//         pass: keys.passSmtp
//     }
// });

// function confirm(data, done) {
//     console.log(data)
// var mailGenerator = new Mailgen({
//     theme: 'default',
//     product: {
//         name: 'Happyland',
//         link: 'https://www.happyland.com.pe/',
//         logo: 'https://www.happyland.com.pe/wp-content/themes/myhappyland/images/logo.svg'
//     }
// });

// let email = {
//     body: {
//         greeting: 'Código de validación - Happyland',
//         title: 'Registro exitoso en Happyland Adventure!',
//         signature: 'Registro exitoso!',
//         intro: ['Bienvenido, disfrute Happyland Adventure'],
//         outro: 'Su código de validación es:' + ' ' + data.message
//     }

// };
// let emailBody = mailGenerator.generate(email);
// let emailText = mailGenerator.generatePlaintext(email);
// let emailOptions = {
//     from: '"Happyland" <noreply@happyland.com.pe>',
//     to: data.email,
//     subject: "Código de validación - Happyland",
//     text: emailText,
//     html: emailBody,
// };
// let message = {
//     attachments: [
//         {   // data uri as an attachment
//             path: data.contract
//         }
//     ]
// }

// console.log(message)
// transporter.sendMail(message, function (error, info) {
//     if (error) {
//         console.log(error);
//         done(error);
//     } else {
//         console.log('Message sent: ' + info.response);
//         done(null, {
//             cod: 1,
//             msg: "Mensaje enviado correctamente"
//         });
//     }
// });
async function confirm(data, done) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: keys.smtpServer,
        port: 587,
        secure: false,
        auth: {
            user: keys.userSmtp,
            pass: keys.passSmtp
        }
    });
    let message = await transporter.sendMail({
        from: 'Happyland <noreply@happyland.com.pe>', // sender address
        to: data.email, // list of receivers
        subject: "Contrato Happyland Adventure", // Subject line
        text: "Adjuntamos el contrato firmado", // plain text body
        html: "<img src='https://www.happyland.com.pe/wp-content/themes/myhappyland/images/logo.svg'></img>", // html body
        attachments: [
            {   // data uri as an attachment
                path: data.contract
            },
        ]
    });
    // let message = {
    //     attachments: [
    //         {   // data uri as an attachment
    //             path: data.contract
    //         }
    //     ]
    // }
    transporter.sendMail(message, function (error, info) {
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
// }
module.exports = {
    confirm
}


