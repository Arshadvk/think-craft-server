import nodemailer from "nodemailer"

export const SendMail =(userData:any, userType:string )=>{
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth:{
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })
    const mailOptions = {
        from: process.env.EMAIL,
        to: userData.email,
        subject: 'Verify Your Email',
        html: `<h1>hi ${userData.name}  <a href= "https://localhost:3000/${userType}/create-password" </a> click here </h1>`
    
    
    }
    transporter.sendMail(mailOptions,(error,info)=>{
        if (error) {
           return error
        }else{
           return info.response
            
        }
        
    }) 
}


