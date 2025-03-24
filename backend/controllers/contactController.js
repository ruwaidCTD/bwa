import nodeMailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


export const sendMail= async (res, res)=>{
    const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 587,
        secure: false,
        auth:{
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        }
    });

    const mailOptions ={
        from: process.env.SMTP_USER,
        to: process.env.SMTP_USER,
        subject: 'Contact Form Submission from ${name}',
        text:'Name: ${name}\nEmail: ${email}\nMessage: ${message}',
    };

    try{
        await transporter.sendMail(mailOptions);
        res.status(200).json({success: true , message:'Email sent Successfully'});
    }catch(error){

        res.status(500).json({success: false , message: error.message});
    }
};