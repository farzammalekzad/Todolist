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
  priority?: string;
  due?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  async addProject(proj: Project) {
    const projectsArray = await this.getProjectAsArray(false);
    projectsArray.push(proj);
    await Storage.set({key: PROJECT_KEY, value: JSON.stringify(projectsArray)});
  }

  async getProjects() {
    return this.getProjectAsArray();
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
}
