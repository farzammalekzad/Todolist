import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewProjectModalPageRoutingModule } from './new-project-modal-routing.module';

import { NewProjectModalPage } from './new-project-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewProjectModalPageRoutingModule
  ],
  declarations: [NewProjectModalPage]
})
export class NewProjectModalPageModule {}
