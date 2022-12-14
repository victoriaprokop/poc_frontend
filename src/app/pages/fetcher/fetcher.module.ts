// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input'

// Components
import { FetcherComponent } from './pages/fetcher/fetcher.component';
import { NoFetchersComponent } from './components/no-fetchers/no-fetchers.component';
import { EditFetcherDialogComponent } from './components/edit-fetcher-dialog/edit-fetcher-dialog.component';
import { AddFetcherDialogComponent } from './components/add-fetcher-dialog/add-fetcher-dialog.component';
import { DeleteFetcherDialogComponent } from './components/delete-fetcher-dialog/delete-fetcher-dialog.component';
import { ScheduleProductionDialogComponent } from './components/schedule-production-dialog/schedule-production-dialog.component';


@NgModule({
  declarations: [
    FetcherComponent,
    NoFetchersComponent,
    EditFetcherDialogComponent,
    AddFetcherDialogComponent,
    DeleteFetcherDialogComponent,
    ScheduleProductionDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: FetcherComponent,
      }
    ]),
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule
  ]
})
export class FetcherModule { }
