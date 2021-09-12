import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import { LineGraphComponent } from './components/line-graph/line-graph.component';
import { AddStockFormComponent } from './components/add-stock-form/add-stock-form.component';
import { AlertBarComponent } from './components/alert-bar/alert-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LineGraphComponent,
    AddStockFormComponent,
    AlertBarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NgxChartsModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 7000, horizontalPosition: 'right' },
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [],
})
export class AppModule {}
