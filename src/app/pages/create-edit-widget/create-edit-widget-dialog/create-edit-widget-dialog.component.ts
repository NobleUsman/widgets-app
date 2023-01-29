import { ApiService } from './../../../services/api.service';
import { ComponentModel } from '../../../../../src/app/models/component-model';
import { WidgetDetailModel } from '../../../../../src/app/models/widget-detail-model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormSubmitType, DailogResultData } from '../../../../../src/app/models/dialog-model';
import { BaseFormData, DummyFormData, LoaderMessage } from '../../../../../src/app/constants/constants';
import * as _ from 'lodash';
import { WidgetModel } from 'src/app/models/widget-model';

@Component({
  selector: 'app-create-edit-widget-dialog',
  templateUrl: './create-edit-widget-dialog.component.html',
  styleUrls: ['./create-edit-widget-dialog.component.css']
})
export class CreateEditWidgetDialogComponent implements OnInit {

  widgetForm: FormGroup;
  componentCount = 1;
  formType: FormSubmitType;
  apiFormData: WidgetDetailModel = DummyFormData;
  widgetID: string;
  isDataLoaded = true;
  loaderMessage = LoaderMessage.fetchWidgetDetail;
  widgets: WidgetModel[];
  componentsList: ComponentModel[];
  apiCount: number;

  get components () {
    return this.widgetForm.get('components') as FormArray;
  }

  constructor(
    public dialogRef: MatDialogRef<CreateEditWidgetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogInputData: any,
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.setOnLoadVariables();
  }

  async setOnLoadVariables() {
    this.initializeForm(BaseFormData); // form needs initialization in case of edit as well
    this.formType = this.dialogInputData.action;
    this.widgetID = this.dialogInputData.widgetID;
    this.widgets = this.apiService.widgets;
    this.componentsList = this.apiService.components;
    this.getApiCount();
    if (this.formType === 'edit') {
      await this.setEditFormData(this.widgetID);
    }
  }

  getApiCount() {
    this.apiCount = this.apiService.apiCallsCount;
  }

  async setEditFormData(widgetID: string) {
    this.isDataLoaded = false;
    await this.apiService.getWidgetDetail(widgetID);
    this.getApiCount();
    this.apiFormData = await this.apiService.widgetDetail
    this.componentCount = this.apiFormData.components.length;
    this.initializeForm(this.apiFormData);
    this.isDataLoaded = true;
  }

  initializeForm(formData: WidgetDetailModel) {
    let components: FormGroup[] = [];

    formData.components.forEach(component => {
      components.push(this.createComponentFormGroup(component));
    });

    this.widgetForm = this.formBuilder.group({
      id: new FormControl(formData.id),
      name: new FormControl(formData.name, [Validators.required]),
      description: new FormControl(formData.description, [Validators.required]),
      count: new FormControl(formData.count, [Validators.required, Validators.min(1)]),
      components: this.formBuilder.array(components)
    })
  }

  createComponentFormGroup(component: ComponentModel): FormGroup {
    return new FormGroup({
      id: new FormControl(component.id),
      name: new FormControl(component.name, [Validators.required]),
      description: new FormControl(component.description, [Validators.required]),
      optional: new FormControl(component.optional),
    })
  }

  addComponent() {
    let areComponentsStatusesValid = this.components.controls.every(control => control.status !== 'INVALID');
    
    if (areComponentsStatusesValid) {
      this.components.push(this.createComponentFormGroup(BaseFormData.components[0]));
      this.componentCount += 1;
    }
  }

  removeComponent(i: number) {
    if (this.componentCount > 1) {
      this.components.removeAt(i);
      this.componentCount -= 1;
    }
  }

  addExistingComponent(componentID: string) {
    let comp = this.componentsList.find(comp => comp.id === componentID) as ComponentModel;

    let areComponentsStatusesValid = this.components.controls.every(control => control.status !== 'INVALID');
    
    if (areComponentsStatusesValid) {
      this.components.push(this.createComponentFormGroup(comp));
      this.componentCount += 1;
    }
  }

  onCloseDialog(action: 'close' | 'submit') {

    if (action === 'close') {
      this.dialogRef.close(false);
      return;
    }

    // check whether initial value equals current form value to stop api call
    if ((this.formType === 'edit') && _.isEqual(this.widgetForm.value, this.apiFormData)) {
      this.dialogRef.close(false);
      return;
    }

    let dialogResult: DailogResultData = {
      action: this.formType,
      data: this.widgetForm.value
    }

    this.dialogRef.close(dialogResult);
  }

  formVal() {
    console.log('form obj ===> ', this.widgetForm)
    console.log('components array ===> ', this.components)
    console.log('value ===> ', this.widgetForm.value)
  }

}
