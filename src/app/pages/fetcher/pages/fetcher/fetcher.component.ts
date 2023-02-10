import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
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
  public displayedColumns: string[] = ['checkbox',  'name',  'host',  'protocol', 'download_failures', 'state', 'actions'];
  public fetchers: FetcherApiModel[] = [];
  public selectedFetchers: FetcherApiModel[] = [];

  public tableDataSource = new MatTableDataSource([]);

  public fetchersSortingState: string = '';

  constructor(
    public dialog: MatDialog,
    private _fetcherService: FetcherService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.fetchersSortingState = this.route.snapshot.queryParams['order_by'] ?? null;

    this._getFetchers();
  }

  public checkAll(event: MatCheckboxChange) {
    this.fetchers.forEach((x) => (x.checked = event.checked));

    this.selectedFetchers = this.fetchers.filter((x) => x.checked);
  }

  public checkItem() {
    this.selectedFetchers = this.fetchers.filter((x) => x.checked);
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

    dialogRef.afterClosed().subscribe((data) => {
      if (data.name) {
        this._snackBar.open(`The fetcher ${data.name} was successfully updated.`, 'x', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

        this._getFetchers(true, data.id);
      }
    });
  }

  public openDeleteFetcherDialog(fetchers: FetcherApiModel[]): void {
    const dialogRef = this.dialog.open(DeleteFetcherDialogComponent, {
      data: fetchers,
    });

    dialogRef.afterClosed().subscribe((data: FetcherApiModel[]) => {
      if (data.length) {
        this._snackBar.open(`${data.length === 1 ? 'The fetcher ' + data[0].name + ' was' : 'Fetchers ' + data.map(f => f.name).join(', ') + ' were'} successfully deleted.`, 'x', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

        this._getFetchers();
      }
    });
  }

  public activateFetcher(fetchers: FetcherApiModel[]) {
    const ids: string[] = fetchers.map(fetcher => fetcher.id);

    this._fetcherService.activateFetcher(ids).subscribe(
      () => {
        this._getFetchers();
      }
    );
  }

  public disableFetcher(fetchers: FetcherApiModel[]) {
    const ids: string[] = fetchers.map(fetcher => fetcher.id);

    this._fetcherService.deactivateeFetcher(ids).subscribe(
      () => {
        this._getFetchers();
      }
    );
  }

  public openScheduleProduction(fetcher: FetcherApiModel): void {
    const dialogRef = this.dialog.open(ScheduleProductionDialogComponent, {
      data: {
        fetcherId: fetcher.id, 
        schedule: fetcher.schedules[fetcher.schedules.length - 1]
      }
    });

    dialogRef.afterClosed().subscribe((saved) => {
      if (saved) {
        this._snackBar.open(`The fetcher schedule was successfully updated.`, 'x', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

        this._getFetchers();
      }
    });
  }

  public sortingChanged(sortingOption: string) {
    this.fetchersSortingState = sortingOption;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        order_by: sortingOption,
      },
      queryParamsHandling: 'merge',
    });

    this._getFetchers();
  }

  private _getFetchers(fetcherUpdated?: boolean, fetcherId?: string): void {
    this.selectedFetchers = [];

    this._fetcherService.getFetchers(this.fetchersSortingState).subscribe(
      (result: FetcherApiModel[]) =>  {
        this.fetchers = result;

        if (fetcherUpdated && fetcherId) {
          setTimeout(() => {
            const row = document.getElementById(fetcherId);
  
            row?.classList.add('updated');

            setTimeout(() => {
              row?.classList.remove('updated');
            }, 3000);
          });
        }
      }
    );
  }
}
