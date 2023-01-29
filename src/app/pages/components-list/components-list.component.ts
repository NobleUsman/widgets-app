import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../src/app/services/api.service';
import { ComponentModel } from '../../../../src/app/models/component-model';
import { LoaderMessage } from '../../../../src/app/constants/constants';

@Component({
  selector: 'app-components-list',
  templateUrl: './components-list.component.html',
  styleUrls: ['./components-list.component.css']
})
export class ComponentsListComponent implements OnInit {

  components: ComponentModel[];
  isDataLoaded = false;
  loaderMessage = LoaderMessage.fetchComponents;

  constructor(
    private apiService: ApiService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getComponents();
  }

  async getComponents(): Promise<void> {
    if (!this.apiService.components) {
      await this.apiService.getComponentList();
    }

    this.components = this.apiService.components.filter(item => item.name !== '');
    this.isDataLoaded = true;
  }

}
