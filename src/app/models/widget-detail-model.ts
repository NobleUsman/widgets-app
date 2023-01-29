import { ComponentModel } from "../../../src/app/models/component-model";

export class WidgetDetailModel {
  id: string;
  name: string;
  description: string;
  count: number;
  components: ComponentModel[]
}