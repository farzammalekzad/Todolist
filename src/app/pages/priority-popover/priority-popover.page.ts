import { Component, OnInit } from '@angular/core';
import {DataService} from '../../service/data.service';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-priority-popover',
  templateUrl: './priority-popover.page.html',
  styleUrls: ['./priority-popover.page.scss'],
})
export class PriorityPopoverPage implements OnInit {

priorities = [];

  constructor(private dataService: DataService, private popoverCtrl: PopoverController) { }

  ngOnInit() {
    this.priorities = this.dataService.getPriorities();
  }

  selectedpriority(priority) {
    this.popoverCtrl.dismiss({priority});
  }

}
