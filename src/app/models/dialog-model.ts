import { WidgetDetailModel } from './widget-detail-model';

export type FormSubmitType = 'create' | 'edit'

export type DailogResultData = {
  action: FormSubmitType,
  data: WidgetDetailModel
}