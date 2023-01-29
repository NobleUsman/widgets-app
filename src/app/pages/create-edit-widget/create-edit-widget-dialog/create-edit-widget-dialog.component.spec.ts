import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditWidgetDialogComponent } from './create-edit-widget-dialog.component';

describe('CreateEditWidgetDialogComponent', () => {
  let component: CreateEditWidgetDialogComponent;
  let fixture: ComponentFixture<CreateEditWidgetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditWidgetDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditWidgetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
