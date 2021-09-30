import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {NewProjectModalPage} from '../new-project-modal/new-project-modal.page';
import {DataService, Project, Task} from '../../service/data.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnInit {
  projects: Project[] = [];
  showTaskInput = false;
  task: Task = {
    name: '',
    project: 0,
    due: '',
    priority: 4
  };

  constructor(private modalCtrl: ModalController, private dataService: DataService) { }

  async ngOnInit() {
    await this.loadData();
  }

  async addCategory() {
    const modal = await this.modalCtrl.create({
      component: NewProjectModalPage,
    });
    await modal.present();

    const result = await modal.onDidDismiss();
    if (result && result.data && result.data.reload) {
      await this.loadData();
      console.log(this.projects);
    }
  }

  async loadData() {
    this.projects = await this.dataService.getProjects();
  }

  async saveTask() {
    await this.dataService.addTask(this.task);
    console.log(this.task);
    this.showTaskInput = false;
    await this.loadData();
    this.task = {
      name: '',
      project: 0,
      due: '',
      priority: 4
    };
  }
}
