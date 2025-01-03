const nodemailer = require("nodemailer");
const dotenv = require("dotenv")
dotenv.config();

const Sendmail = async (userEmail, htmlTemplate) => {


    const transporter = nodemailer.createTransport({
        port: 587,
        service: "gmail",
        auth: {
            user: "varadehrushikesh87@gmail.com",
            pass: process.env.EMAIL_PASS,
        },
    });

    const info = await transporter.sendMail({
        from: "varadehrushikesh87@gmail.com", // sender address
        to: userEmail, // list of receivers
        subject: "Hello ✔", // Subject line
        html: htmlTemplate, // html body
    });
    if (info) {
        console.log("Email sent successfully");
    } else {
        console.log("Email not sent");
    }

    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>



}

module.exports = Sendmail