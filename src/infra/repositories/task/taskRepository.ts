import { Task, tasks } from "../../../domain/entities/task/task";
import { MongoDBTask } from "../../database/model/task/task";

export type TaskRepository ={
    createNewTask:(domainId:string , task:tasks)=>Promise<Task>

}

const taskRepositoryIMPL = (TaskModel:MongoDBTask):TaskRepository=>{

    const createNewTask = async (domainId: string , tasks:tasks):Promise<Task> => {
        const isDomainExist  = await TaskModel.findOne({domain:domainId})
        if(!isDomainExist) {
            const newTask = new TaskModel({
                domain: domainId ,
                tasks : tasks
            })

            const createdTask : Task = await newTask.save()
            return createdTask
        }
        
            isDomainExist.tasks.push(tasks)
        await isDomainExist.save()
        return isDomainExist
    }

    
    return {createNewTask}
}

export default taskRepositoryIMPL