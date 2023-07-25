import { StudentRepository } from "../../../../infra/repositories/student/studentRepository"
import { AppError } from "../../../../utils/error";
import nodemailer from "nodemailer"


export const createStudentUsecase = (studentRepository: StudentRepository) => {
    console.log("tdfygfdc")

   return async (studentData: any):Promise<string | null > => {
        
    console.log("tdfygfdc")
        
        console.log(studentData);
        
        const isStudent = await studentRepository.findStudentByEmail(studentData.email)
        if (isStudent) throw new AppError("Student is already exist", 409)
        const newStudent = await studentRepository.createStudent(studentData)

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
            to: studentData.email,
            subject: 'Verify Your Email',
            html: "<p></p>"


        }
        transporter.sendMail(mailOptions,(error,info)=>{
            if (error) {
                console.log(error+'djsd');
            }else{
                console.log("Email has been sent:-", info.response);
                
            }
            
        })
        
        return newStudent
    }


}
