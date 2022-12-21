import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetcherService } from '../../services/fetcher.service';
import { AddFetcherDialogComponent } from '../add-fetcher-dialog/add-fetcher-dialog.component';

@Component({
  selector: 'app-no-fetchers',
  templateUrl: './no-fetchers.component.html',
  styleUrls: ['./no-fetchers.component.scss']
})
export class NoFetchersComponent {
  constructor(
    public dialog: MatDialog,
  ) {}

  public openAddFetcherDialog(): void {
    this.dialog.open(AddFetcherDialogComponent);
  }
}
