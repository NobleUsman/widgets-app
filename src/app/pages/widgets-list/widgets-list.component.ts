import { Component, OnInit } from '@angular/core';
import { WidgetModel } from '../../../../src/app/models/widget-model';
import { ApiService } from '../../../../src/app/services/api.service';
import { WidgetAction } from '../../../../src/app/models/widget-action';
import { LoaderMessage } from '../../../../src/app/constants/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-widgets-list',
  templateUrl: './widgets-list.component.html',
  styleUrls: ['./widgets-list.component.css']
})
export class WidgetsListComponent implements OnInit {

  widgets: WidgetModel[];
  isDataLoaded = false;
  loaderMessage = LoaderMessage.fetchWidgets;

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getWidgets();
  }

  async getWidgets(): Promise<void> {
    if (!this.apiService.widgets) {
      await this.apiService.getWidgetList();
    }

    await this.setWidgetsInView();
    this.isDataLoaded = true;
  }

  async setWidgetsInView() {
    this.widgets = await this.apiService.widgets.filter(item => item.name !== '');
  }

  async widgetAction(value: WidgetAction) {

    // set loader message & start loader
    (value.action === 'delete') ? 
    (this.loaderMessage = LoaderMessage.deleteWidget) : 
    (this.loaderMessage = LoaderMessage.fetchWidgetDetail);
    
    this.isDataLoaded = false;

    switch (value.action) {
      case 'view':
        await this.apiService.getWidgetDetail(value.widgetID);
        this.router.navigate(['widget-detail']);
        break;

      case 'delete':
        await this.apiService.deleteWidget(value.widgetID);
        await this.setWidgetsInView();
        break;
    
      default:
        break;
    }

    // stop loader & set original loader message
    this.isDataLoaded = true;
    this.loaderMessage = LoaderMessage.fetchWidgets;
  }

}
