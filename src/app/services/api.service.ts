import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { 
  widgetsApi,
  componentsApi,
  widgetDetailApi
 } from '../../../src/app/api/api-url';
import { ComponentModel } from '../models/component-model';
import { WidgetModel } from '../models/widget-model'; 
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { WidgetDetailModel } from '../models/widget-detail-model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // components ---
  private _componentsList: ComponentModel[];

  get components(): ComponentModel[] {
    return this._componentsList;
  }

  // widgets ---
  private _widgetsList: WidgetModel[];

  get widgets(): WidgetModel[] {
    return this._widgetsList;
  }

  // widget detail ---
  private _widgetDetail: WidgetDetailModel;

  get widgetDetail(): WidgetDetailModel {
    return this._widgetDetail;
  }

  // error message ---
  private _errorMessage: HttpErrorResponse;

  get error(): HttpErrorResponse {
    return this._errorMessage;
  }

  // api calls count ---
  private _apiCallsCount: number = 0;

  get apiCallsCount(): number {
    return this._apiCallsCount;
  }

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  async getComponentList() {
    await firstValueFrom(this.http.get<ComponentModel[]>(componentsApi))
    .then(res => {
      this._componentsList = res;
      this._apiCallsCount++;
    } )
    .catch((err: HttpErrorResponse) => this.handleError(err))
  }

  async getWidgetList() {
    await firstValueFrom(this.http.get<WidgetModel[]>(widgetsApi))
    .then(res => {
      this._widgetsList = res;
      this._apiCallsCount++;
    })
    .catch((err: HttpErrorResponse) => this.handleError(err))
  }

  async createWidget(data: WidgetDetailModel) {
    await firstValueFrom(this.http.post<WidgetDetailModel>(widgetsApi, data))
    .then(res => {
      this._apiCallsCount++;
    } )
    .catch((err: HttpErrorResponse) => this.handleError(err))
  }

  async deleteWidget(id: string) {
    await firstValueFrom(this.http.delete<void>(widgetDetailApi(id)))
    .then(async (res) => {
      await this.getWidgetList();
      this._apiCallsCount++;
    })
    .catch((err: HttpErrorResponse) => this.handleError(err))
  }

  async getWidgetDetail(id: string) {
    await firstValueFrom(this.http.get<WidgetDetailModel>(widgetDetailApi(id)))
    .then(res => {
      this._widgetDetail = res;
      this._apiCallsCount++;
    })
    .catch((err: HttpErrorResponse) => this.handleError(err))
  }

  async updateWidgetDetail(id: string, data: WidgetDetailModel) {
    await firstValueFrom(this.http.put<WidgetDetailModel>(widgetDetailApi(id), data))
    .then(res => {
      this._widgetDetail = res;
      this._apiCallsCount++;
    })
    .catch((err: HttpErrorResponse) => this.handleError(err))
  }

  handleError(error: HttpErrorResponse) {
    this._errorMessage = error;
    this.router.navigate(['error']);
  }

  // ! remove this later (for testing err)
  async hitErr() {
    await firstValueFrom(this.http.get<ComponentModel[]>('https://magni-careers.azurewebsites.net/widget'))
    .then(res => console.log('err ===> ', res) )
    .catch((err: HttpErrorResponse) => this.handleError(err))
  }
}
