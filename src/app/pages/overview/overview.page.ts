import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalController, PopoverController} from '@ionic/angular';
import {NewProjectModalPage} from '../new-project-modal/new-project-modal.page';
import {DataService, Project, Task} from '../../service/data.service';
import {ProjectPopoverPage} from '../project-popover/project-popover.page';
import {PriorityPopoverPage} from '../priority-popover/priority-popover.page';

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
    due: new Date().toISOString(),
    priority: 4
  };
  @ViewChild('due', {static: false, read: ElementRef}) due: ElementRef;

  constructor(private modalCtrl: ModalController, private dataService: DataService, private popoverCtrl: PopoverController) { }

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
    const fakeProject = this.task.project as any;
    this.task.project = this.task.project ? fakeProject.id : null;
    await this.dataService.addTask(this.task);
    console.log('task:',this.task);
    this.showTaskInput = false;
    await this.loadData();
    this.task = {
      name: '',
      project: 0,
      due: '',
      priority: 4
    };
  }

  async openProjectPopover(event) {
    const popover = await this.popoverCtrl.create({
      component: ProjectPopoverPage,
      event
    });
    await popover.present();
    popover.onDidDismiss().then(result => {
      console.log(result.data);
      if (result.data && result.data.project) {
        this.task.project = result.data.project;
      }
    });

  }

  async openPriorityPopover(event) {
    const popover = await this.popoverCtrl.create({
      component: PriorityPopoverPage,
      event
    });
    await popover.present();
    popover.onDidDismiss().then(result => {
      if (result.data && result.data.priority) {
        this.task.priority = result.data.priority;
      }
    });

  }

  setTaskDue() {
    this.due.nativeElement.click();

  }

}
