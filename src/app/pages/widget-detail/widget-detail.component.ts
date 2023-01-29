import { ComponentModel } from '../../../../src/app/models/component-model';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../src/app/services/api.service';
import { Router } from '@angular/router';
import { WidgetDetailModel } from '../../../../src/app/models/widget-detail-model';

@Component({
  selector: 'app-widget-detail',
  templateUrl: './widget-detail.component.html',
  styleUrls: ['./widget-detail.component.css']
})
export class WidgetDetailComponent implements OnInit {

  widget: WidgetDetailModel;
  components: ComponentModel[];

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getWidgetDetail();
  }

  getWidgetDetail() {
    this.widget = this.apiService.widgetDetail;
    this.components = this.widget.components.filter(item => item.name !== '');
  }

  backToList() {
    this.router.navigate(['widgets-list']);
  }
}
