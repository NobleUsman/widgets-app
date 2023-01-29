import { WidgetModel } from './../../models/widget-model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoaderMessage } from './../../constants/constants';
import { CreateEditWidgetDialogComponent } from './create-edit-widget-dialog/create-edit-widget-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DailogResultData, FormSubmitType } from '../../../../src/app/models/dialog-model';
import { ApiService } from '../../../../src/app/services/api.service';

@Component({
  selector: 'app-create-edit-widget',
  templateUrl: './create-edit-widget.component.html',
  styleUrls: ['./create-edit-widget.component.css']
})
export class CreateEditWidgetComponent implements OnInit {

  isDataLoaded = true;
  loaderMessage: string;
  widgets: WidgetModel[];
  chooseWidget = new FormGroup({
    widgetID: new FormControl('', [Validators.required])
  })

  constructor(
    private dialog: MatDialog,
    private apiService: ApiService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getWidgetsAndComponents();
  }

  // call api for both if data isnt present, as both widgets, components list are needed inside create/edit dialog which is on same route
  // this is done as a precautionary measure if user directly hits this page's route
  async getWidgetsAndComponents(): Promise<void> {
    if (!this.apiService.widgets) {
      this.loaderMessage = LoaderMessage.fetchWidgets;
      this.isDataLoaded = false;
      await this.apiService.getWidgetList();
    }

    if (!this.apiService.components) {
      this.loaderMessage = LoaderMessage.fetchComponents;
      this.isDataLoaded = false;
      await this.apiService.getComponentList();
    }

    this.isDataLoaded = true;
    this.widgets = this.apiService.widgets;
  }
  
  openDialog(action: FormSubmitType) {
    const dialogConfig = {
      width: '50vw',
      height: '70vh',
      backdropClass: 'backdrop-blur-sm',
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      panelClass: 'remove-padding',
      data: {
        action: action,
        widgetID: (action === 'edit') && (this.chooseWidget.controls.widgetID.value)
      },
    }

    const dialogRef = this.dialog.open(CreateEditWidgetDialogComponent, dialogConfig);
    
    // handle after close here
    dialogRef.afterClosed().subscribe(async (dialogResult: DailogResultData) => {

      // set loader message
      (dialogResult.action === 'create') ? (this.loaderMessage = LoaderMessage.createWidget) : (this.loaderMessage = LoaderMessage.updateWidget);

      // set loader if theres data spitted out from dialog
      dialogResult && (this.isDataLoaded = false);

      switch (dialogResult.action) {
        case 'create':
          // call post widget api
          await this.apiService.createWidget(dialogResult.data);
          await this.updateWidgetAndComponentLists();
          break;

        case 'edit':
          // call put widget api
          this.loaderMessage = LoaderMessage.updateWidget;
          await this.apiService.updateWidgetDetail(dialogResult.data.id, dialogResult.data);
          await this.updateWidgetAndComponentLists();
          break;

        default:
          break;
      }

      this.isDataLoaded = true;
    });
  }

  async updateWidgetAndComponentLists() {
    this.loaderMessage = LoaderMessage.fetchWidgets;
    await this.apiService.getWidgetList();

    this.loaderMessage = LoaderMessage.fetchComponents;
    await this.apiService.getComponentList();
  }

}
