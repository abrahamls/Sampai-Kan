const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: 'sampaikanpaikan@hotmail.com',
        pass: '123456789!@#$'
    }
})

// const option = {
//     from: "sampaikanpaikan@hotmail.com",
//     to: "abraham.siahaan1997@gmail.com",
//     subject: "ini test",
//     text: "hey, it works"
// }

// transporter.sendMail(option, (err, info) => {
//     if (err) console.log(err);
//     else console.log("sent: " + info.response);
    
// })

module.exports = transporter