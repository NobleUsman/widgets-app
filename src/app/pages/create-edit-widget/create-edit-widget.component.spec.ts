import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditWidgetComponent } from './create-edit-widget.component';

describe('CreateEditWidgetComponent', () => {
  let component: CreateEditWidgetComponent;
  let fixture: ComponentFixture<CreateEditWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
