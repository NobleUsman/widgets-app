import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WidgetModel } from '../../../../src/app/models/widget-model';
import { ComponentModel } from '../../../../src/app/models/component-model';
import { WidgetAction } from '../../../../src/app/models/widget-action';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() array: ComponentModel[] | WidgetModel[];
  @Input() isWidgetCard = true;
  @Input() isWidgetDetailComponentCard = false;

  @Output() widgetAction = new EventEmitter<WidgetAction>();

  constructor() { }

  ngOnInit(): void { }

  deleteWidget(id: string) {
    this.widgetAction.emit({
      widgetID: id,
      action: 'delete'
    });
  }

  viewWidget(id: string) {
    this.widgetAction.emit({
      widgetID: id,
      action: 'view'
    });
  }

}
