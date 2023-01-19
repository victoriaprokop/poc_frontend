import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddFetcherDialogComponent } from '../../components/add-fetcher-dialog/add-fetcher-dialog.component';
import { DeleteFetcherDialogComponent } from '../../components/delete-fetcher-dialog/delete-fetcher-dialog.component';
import { EditFetcherDialogComponent } from '../../components/edit-fetcher-dialog/edit-fetcher-dialog.component';
import { ScheduleProductionDialogComponent } from '../../components/schedule-production-dialog/schedule-production-dialog.component';
import { FetcherApiModel } from '../../models/fetcher-api-model';
import { FetcherService } from '../../services/fetcher.service';

@Component({
  selector: 'app-fetcher',
  templateUrl: './fetcher.component.html',
  styleUrls: ['./fetcher.component.scss']
})
export class FetcherComponent implements OnInit {
  public displayedColumns: string[] = ['checkbox',  'name',  'host',  'protocol', 'download_failures', 'state'];

  public checkedAll: boolean = false;
  public dataSource: FetcherApiModel[] = [];
  public selectedFetchers: FetcherApiModel[] = []

  constructor(
    public dialog: MatDialog,
    private _fetcherService: FetcherService,
    private _snackBar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    this._getFetchers();
  }

  checkAll(event: MatCheckboxChange) {
    this.dataSource.forEach((x) => (x.checked = event.checked));

    this.selectedFetchers = this.dataSource.filter((x) => x.checked);
  }

  checkItem() {
    this.selectedFetchers = this.dataSource.filter((x) => x.checked);
  }

  public openAddFetcherDialog(): void {
    const dialogRef = this.dialog.open(AddFetcherDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._snackBar.open(`The fetcher ${result.name} was successfully created.`, 'x', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

        this._getFetchers();
      }
    });
  }

  public openEditDialog(fetcher: FetcherApiModel): void {
    const dialogRef = this.dialog.open(EditFetcherDialogComponent, {
      data: fetcher,
    });

    dialogRef.afterClosed().subscribe((name) => {
      if (name) {
        this._snackBar.open(`The fetcher ${name} was successfully updated.`, 'x', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

        this._getFetchers();
      }
    });
  }

  public openDeleteFetcherDialog(fetcher: FetcherApiModel): void {
    const dialogRef = this.dialog.open(DeleteFetcherDialogComponent, {
      data: fetcher,
    });

    dialogRef.afterClosed().subscribe((name) => {
      if (name) {
        this._snackBar.open(`The fetcher ${name} was successfully deleted.`, 'x', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

        this._getFetchers();
      }
    });
  }

  public restartFetcher() {}

  public openScheduleProduction(fetcherId: string): void {
    const dialogRef = this.dialog.open(ScheduleProductionDialogComponent, {
      data: fetcherId,
    });

    dialogRef.afterClosed().subscribe((name) => {
      if (name) {
        this._snackBar.open(`The fetcher ${name} schedule was successfully updated.`, 'x', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    });
  }

  private _getFetchers(): void {
    this._fetcherService.getFetchers().subscribe((result: FetcherApiModel[]) =>  this.dataSource = result);
  }
}
