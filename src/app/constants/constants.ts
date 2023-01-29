import { WidgetDetailModel } from './../models/widget-detail-model';

export const LoaderMessage = {
  fetchData: 'Fetching Data ...',
  fetchWidgetDetail: 'Fetching Widget Details ...',
  fetchWidgets: 'Fetching Widgets ...',
  fetchComponents: 'Fetching Components ...',
  deleteWidget: 'Deleting Widget ...',
  createWidget: 'Creating Widget ...',
  updateWidget: 'Updating Widget ...',
}

export const BaseFormData: WidgetDetailModel = {
  id: '',
  name: '',
  description: '',
  count: 1,
  components: [
    {
      id: '',
      name: '',
      description: '',
      optional: false
    }
  ]
}

export const DummyFormData: WidgetDetailModel = {
  "id": "C7677E66-2C6F-42CF-A2C6-9C111529B60E",
  "name": "Widget 1 Animesh Sharma Component update 4",
  "description": "Widget 1 Animesh Sharma Component",
  "count": 1,
  "components": [
      {
          "id": "CE54C123-BB50-4221-95C8-C89F63C513F3",
          "name": "Widget 3 Animesh Sharma Component",
          "description": "Widget 3 Animesh Sharma Component",
          "optional": true
      },
      {
          "id": "1A7D8204-A611-4C97-9EBF-A77B70186BBF",
          "name": "tesrt 123123123",
          "description": "qweqwe",
          "optional": false
      }
  ]
}