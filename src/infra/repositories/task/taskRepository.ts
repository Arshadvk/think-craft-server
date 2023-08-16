import { Task, tasks } from "../../../domain/entities/task/task";
import { MongoDBTask } from "../../database/model/task/task";

export type TaskRepository ={
    createNewTask:(domainId:string , task:tasks)=>Promise<Task>
    findTaskByDomain:(domainId:string ,week : number )=>Promise<Task | null>
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

    const findTaskByDomain = async (domainId:string , week:number):Promise<Task | null> => {
        const task : Task | null = await TaskModel.findOne({
            domain: domainId,
            'tasks.week': week
          }, {
            'tasks.$': 1 // This ensures that only the matched task within the array is returned
          });
        return task 
    }
    
    return {createNewTask , findTaskByDomain}
}

export default taskRepositoryIMPL