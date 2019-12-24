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
        theme: 'cerberus',
        product: {
            name: 'Happyland',
            link: 'https://www.happyland.com.pe/'
        }
    });
 
    let email = {
        body: {
            greeting: 'Registro',
            title: 'Registro exitoso en Happyland!',
            signature: 'Registro exitoso!',
            intro: ['Bienvenido'],
            outro: 'Mensaje:' + ' ' + data.message
        }

    };
    let emailBody = mailGenerator.generate(email);
    let emailText = mailGenerator.generatePlaintext(email);
    let emailOptions  = {
        from: '"Happyland" <diegoalonso.renteria@gmail.com>',
        to: data.email,
        subject: "registro",
        text: emailText,
        html: emailBody

    }

  transporter.sendMail(emailOptions, function(error, info) {
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


