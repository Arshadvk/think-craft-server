import { AppError } from "../../../utils/error.js"
import { changePassType } from "../student/studentLogin.js"
import { isPasswordCorrect, passwordHashing } from "../../../domain/service/hashing.js"
import { Advisor, advisorLoginValidate } from "../../../domain/entities/advisor/advisor.js"
import { AdvisorRepository } from "../../../infra/repositories/advisor/advisorRepository.js"
import { advisorLoginType } from "../../../interface/controller/advisor/advisorLoginController.js"

type advisorReturnType = {
    token: string
    status: string
}

export const loginAdvisor = (advisorRepository: AdvisorRepository) => {
    return async (advisor: advisorLoginType): Promise<advisorReturnType> => {


        const isAdvisorExist: Advisor | null = await advisorRepository.findAdvisorByEmail(advisor.email)
        if (!isAdvisorExist) throw new AppError("user is not exist", 404)


        const AdvisorToken = await advisorLoginValidate(advisor, isAdvisorExist)
        const verifiedAdvisor = {
            token: AdvisorToken,
            status: "advisor login successfully"
        }
        return verifiedAdvisor
    }
}

export const changeAdvisorPassword = (advisorRepository: AdvisorRepository) => {
    return async (advisor: string, value: changePassType) => {
        const isAdvisorExist: Advisor | null = await advisorRepository.findAdvisorById(advisor)
        console.log(isAdvisorExist);

        if (!isAdvisorExist) throw new AppError("user is not exist", 404)
        const IsPasswordCorrect = await isPasswordCorrect(value.oldpass, isAdvisorExist.password)
        console.log(IsPasswordCorrect);

        if (!IsPasswordCorrect) throw new AppError("Old password is not same", 404)
        console.log("hello");

        const hashedPassword = await passwordHashing(value.newpass)

        console.log(hashedPassword);

        const updateAdvisor = await advisorRepository.updateAdvisorProfile(advisor, { password: hashedPassword })
        return updateAdvisor
    }
}