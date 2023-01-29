import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WidgetsListComponent } from '../../src/app/pages/widgets-list/widgets-list.component';
import { ComponentsListComponent } from '../../src/app/pages/components-list/components-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from '../../src/app/pages/error/error.component';
import { NavigationComponent } from '../../src/app/components/navigation/navigation.component';
import { CardComponent } from '../../src/app/components/card/card.component';
import { LoaderComponent } from './components/loader/loader.component';
import { WidgetDetailComponent } from '../../src/app/pages/widget-detail/widget-detail.component';
import { CreateEditWidgetComponent } from './pages/create-edit-widget/create-edit-widget.component';
import { CreateEditWidgetDialogComponent } from './pages/create-edit-widget/create-edit-widget-dialog/create-edit-widget-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    WidgetsListComponent,
    ComponentsListComponent,
    ErrorComponent,
    NavigationComponent,
    CardComponent,
    LoaderComponent,
    WidgetDetailComponent,
    CreateEditWidgetComponent,
    CreateEditWidgetDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
