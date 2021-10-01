import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService, Project} from '../../service/data.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss'],
})
export class ProjectPage implements OnInit {
  project: Project;
  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(data => {
      this.dataService.projectById(data.get('id')).then(proj => {
        this.project = proj;
      });
    });
  }

}
