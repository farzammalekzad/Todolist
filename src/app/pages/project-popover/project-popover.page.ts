import { Component, OnInit } from '@angular/core';
import {DataService, Project} from '../../service/data.service';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-project-popover',
  templateUrl: './project-popover.page.html',
  styleUrls: ['./project-popover.page.scss'],
})
export class ProjectPopoverPage implements OnInit {
  projects = [];
  constructor(private dataService: DataService, private popoverCtrl: PopoverController) { }

  ngOnInit() {
    this.dataService.getProjects().then(projects => {
      this.projects = projects;
    });
  }

  selectedProject(project: Project) {
    this.popoverCtrl.dismiss({project});
  }
}
