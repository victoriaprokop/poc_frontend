import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekDaysSelectorComponent } from './week-days-selector.component';



@NgModule({
  declarations: [
    WeekDaysSelectorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WeekDaysSelectorComponent
  ]
})
export class WeekDaysSelectorModule { }
