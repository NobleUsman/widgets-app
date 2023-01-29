import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WidgetsListComponent } from '../../src/app/pages/widgets-list/widgets-list.component'
import { ComponentsListComponent } from '../../src/app/pages/components-list/components-list.component'
import { ErrorComponent } from '../../src/app/pages/error/error.component';
import { WidgetDetailComponent } from '../../src/app/pages/widget-detail/widget-detail.component';
import { CreateEditWidgetComponent } from '../../src/app/pages/create-edit-widget/create-edit-widget.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'widgets-list',
    pathMatch: 'full'
  },
  {
    path: 'widgets-list',
    component: WidgetsListComponent
  },
  {
    path: 'components-list',
    component: ComponentsListComponent
  },
  {
    path: 'widget-detail',
    component: WidgetDetailComponent
  },
  {
    path: 'create-edit-widget',
    component: CreateEditWidgetComponent
  },
  { path: 'error',
    component: ErrorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
