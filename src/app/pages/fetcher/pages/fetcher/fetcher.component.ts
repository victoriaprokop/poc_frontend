import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFetcherDialogComponent } from '../../components/add-fetcher-dialog/add-fetcher-dialog.component';
import { DeleteFetcherDialogComponent } from '../../components/delete-fetcher-dialog/delete-fetcher-dialog.component';
import { EditFetcherDialogComponent } from '../../components/edit-fetcher-dialog/edit-fetcher-dialog.component';

@Component({
  selector: 'app-fetcher',
  templateUrl: './fetcher.component.html',
  styleUrls: ['./fetcher.component.scss']
})

export class FetcherComponent {
  public displayedColumns: string[] = [
    'checkbox', 
    'name', 
    'host', 
    'protocol',
    'download_failures',
    'state',
  ];

  public dataSource: Fetcher[] = [
    { 
      checkbox: false, 
      name: 'QA mail', 
      host: 'mail.intradyn.com',
      protocol: 'IMAP4',
      download_failures: 0,
      state: 'Active - currently running'
    },
    { 
      checkbox: false, 
      name: 'QA mail', 
      host: 'mail.intradyn.com',
      protocol: 'IMAP4',
      download_failures: 0,
      state: 'Active - currently running'
    },
  ];

  public selectedFetchers: Fetcher[] = [];

  constructor(
    public dialog: MatDialog
  ) {}

  public onCheckAll() {}

  public onCheck(fetcher: Fetcher) {
    console.log(fetcher);
  }

  public openAddFetcherDialog(): void {
    const dialogRef = this.dialog.open(AddFetcherDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  public openEditDialog(fetcher: Fetcher): void {
    const dialogRef = this.dialog.open(EditFetcherDialogComponent, {
      data: fetcher,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  public openDeleteFetcherDialog(fetcher: Fetcher): void {
    const dialogRef = this.dialog.open(DeleteFetcherDialogComponent, {
      data: fetcher,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}

interface Fetcher {
  checkbox: boolean;
  name: string;
  host: string;
  protocol: string;
  download_failures: number;
  state: string;
}
