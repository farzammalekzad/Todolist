import { Injectable } from '@angular/core';
import {Storage} from '@capacitor/storage';

const PROJECT_KEY = 'categories';
const TASK_KEY = 'tasks';

export interface Project {
  name: string;
  color: string;
  id?: number;
  task?: Task[];
}

export interface Task {
  name: string;
  project?: number;
  id?: number;
  done?: boolean;
  priority?: number;
  due?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  async addProject(proj: Project) {
    const projectsArray = await this.getProjectAsArray(false);
    proj.id = Date.now();
    projectsArray.push(proj);
    await Storage.set({key: PROJECT_KEY, value: JSON.stringify(projectsArray)});
  }

  async getProjects() {
    return this.getProjectAsArray();
  }

  async addTask(task: Task) {
    const initalTask = await this.getTaskAsArray();
    task.id = Date.now();
    initalTask.push(task);
    return Storage.set({key: TASK_KEY, value: JSON.stringify(initalTask)});
  }

  async getTask() {
    return this.getTaskAsArray();
  }

  getPriorities() {
    const priorities = [
      {
        value: 1,
        color: '#ff0000'
      },
      {
        value: 2,
        color: '#ff9d46'
      },
      {
        value: 3,
        color: '#0000ff'
      },
      {
        value: 4,
        color: '#737373'
      }
    ];
    return priorities;
  }

  private async getProjectAsArray(addInbox = true) {
    const projects = await Storage.get({key: PROJECT_KEY});
    let projectArray = [];
    if (projects.value) {
      projectArray = JSON.parse(projects.value);
    }
    if (addInbox) {
      projectArray.push({
        name: 'inbox',
        color: '#fffff',
        id: 0,
        task: []
      });
    }
    return projectArray;
  }

  private async getTaskAsArray() {
    const tasks = await Storage.get({key: TASK_KEY});
    let taskArray = [];
    if (tasks.value) {
      taskArray = JSON.parse(tasks.value);
    }
    return taskArray;
  }
}
