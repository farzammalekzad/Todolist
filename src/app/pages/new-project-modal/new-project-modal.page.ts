import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {DataService, Project} from '../../service/data.service';
import {ColorEvent} from "ngx-color";

@Component({
  selector: 'app-new-project-modal',
  templateUrl: './new-project-modal.page.html',
  styleUrls: ['./new-project-modal.page.scss'],
})
export class NewProjectModalPage implements OnInit {

  showColor = false;

  project: Project = {
    name: '',
    color: '#01f2'
  };

  constructor(private modalCtrl: ModalController, private dataService: DataService) { }

  ngOnInit() {
  }

  async save() {
    await this.dataService.addProject(this.project);
    this.modalCtrl.dismiss({reload: true});

  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  async colorSelected(event: ColorEvent) {
    this.project.color = event.color.hex;
  }

}
