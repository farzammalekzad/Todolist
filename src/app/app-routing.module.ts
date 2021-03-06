import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'overview',
    loadChildren: () => import('./pages/overview/overview.module').then( m => m.OverviewPageModule)
  },
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full'
  },
  {
    path: 'new-project-modal',
    loadChildren: () => import('./pages/new-project-modal/new-project-modal.module').then( m => m.NewProjectModalPageModule)
  },
  {
    path: 'project-popover',
    loadChildren: () => import('./pages/project-popover/project-popover.module').then( m => m.ProjectPopoverPageModule)
  },
  {
    path: 'priority-popover',
    loadChildren: () => import('./pages/priority-popover/priority-popover.module').then( m => m.PriorityPopoverPageModule)
  },
  {
    path: 'project/:id',
    loadChildren: () => import('./pages/project/project.module').then( m => m.ProjectPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
