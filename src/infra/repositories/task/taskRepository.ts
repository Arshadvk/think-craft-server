import { ObjectId } from "mongoose";
import { Task, tasks } from "../../../domain/entities/task/task";
import { MongoDBTask, taskModel } from "../../database/model/task/task";
import { query } from "express";

export interface FilterTask {
  domain?: ObjectId
  week?: object
  task?: string
}


export type TaskRepository = {
  createNewTask: (domainId: string, task: tasks) => Promise<Task>
  findWeeklyTask: (domainId: string, week: number) => Promise<Task | null>
  findAllTask: (filterData: FilterTask) => Promise<Task | null>
  findOneTask: (id: string) => Promise<Task | null>
  findOneTaskAndUpdate: (id: string, UpdatedData: Object) => Promise<Task | null>
}

const taskRepositoryIMPL = (TaskModel: MongoDBTask): TaskRepository => {

  const createNewTask = async (domainId: string, tasks: tasks): Promise<Task> => {
    const isDomainExist = await TaskModel.findOne({ domain: domainId })
    if (!isDomainExist) {
      const newTask = new TaskModel({
        domain: domainId,
        tasks: tasks
      })

      const createdTask: Task = await newTask.save()
      return createdTask
    }

    isDomainExist.tasks.push(tasks)
    await isDomainExist.save()
    return isDomainExist
  }

  const findWeeklyTask = async (domainId: string, week: number): Promise<Task | null> => {
    const task: Task | null = await TaskModel.findOne({
      domain: domainId,
      'tasks.week': week
    }, {
      'tasks.$': 1
    });
    return task
  }

  const findAllTask = async (filterData: FilterTask): Promise<Task | null> => {
    const query: any = {}
    if (filterData.week) {
      query['tasks.week'] = filterData.week;
    }
    if (filterData.domain) {
      query.domain = filterData.domain;
    }
    if (filterData.task) {
      query['tasks'] = {
        $elemMatch: {
          _id: filterData.task,
        },
      };
    }

    const tasks: any | null = taskModel.find(query).populate('domain')
    return tasks
  }
  const findOneTask = async (id: string): Promise<Task | null> => {
    const task: Task | any = taskModel.find({
      "tasks": {
        $elemMatch: { "_id": id }
      }
    }, {
      'tasks.$': 1
    });
    return task
  }

  const findOneTaskAndUpdate = async (taskId: string, UpdatedData: Object): Promise<Task | null> => {

    const query = {
      "tasks": {
        $elemMatch: {
          "_id": taskId
        }
      }
    };
    const result = await taskModel.findOneAndUpdate(
      query,
      { $set: { "tasks.$": UpdatedData } },
      { new: true }
    );

    return result;
  }
  return { createNewTask, findWeeklyTask, findAllTask, findOneTask, findOneTaskAndUpdate }
}

export default taskRepositoryIMPL