import { MongoDBTask } from "../../../database/model/task/task";

export type TaskRepository ={
    createNewTask:(task:any)=>Promise<any>

}

const taskRepositoryIMPL = (TaskModel:MongoDBTask):TaskRepository=>{

    const createNewTask =async (task:any):Promise<any> => {
        const newTask = await TaskModel.create(task)
        return newTask
        
    }
    return {createNewTask}
}

export default taskRepositoryIMPL