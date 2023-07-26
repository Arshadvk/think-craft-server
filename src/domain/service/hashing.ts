import bcrypt from "bcrypt"

export const passwordHashing:Function = async(password:string):Promise<string>=>{
    const hashedPassword = await bcrypt.hash(password,10);
    console.log(hashedPassword);
    
    return hashedPassword
}

export const isPasswordCorrect = async(plainTextPassword:string,hashedPassword:string):Promise<boolean>=>{
    const password :boolean = await bcrypt.compare(plainTextPassword,hashedPassword);
    return password
}