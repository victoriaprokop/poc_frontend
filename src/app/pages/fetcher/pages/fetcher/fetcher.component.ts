import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { AddFetcherDialogComponent } from '../../components/add-fetcher-dialog/add-fetcher-dialog.component';
import { DeleteFetcherDialogComponent } from '../../components/delete-fetcher-dialog/delete-fetcher-dialog.component';
import { EditFetcherDialogComponent } from '../../components/edit-fetcher-dialog/edit-fetcher-dialog.component';
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
    private _fetcherService: FetcherService
  ) {}

  public ngOnInit(): void {
      this._getFetchers();
  }

  // public onCheckAll(event: MatCheckboxChange) {
  //   this.dataSource.forEach((fetcher) => {
  //     fetcher.checked = event.checked
  //   });

  //   this.selectedFetchers = event.checked ? this.dataSource : [];
  // }

  // public onCheckOne(event: MatCheckboxChange, fetcherId: string) {

  // }

  checkAll(event: MatCheckboxChange) {
    this.dataSource.forEach((x) => (x.checked = event.checked));

    this.selectedFetchers = this.dataSource.filter((x) => x.checked);
  }

  checkItem() {
    this.selectedFetchers = this.dataSource.filter((x) => x.checked);
  }

  public onCheck(fetcher: FetcherApiModel) {
    console.log(fetcher);
  }

  public openAddFetcherDialog(): void {
    const dialogRef = this.dialog.open(AddFetcherDialogComponent);

    dialogRef.afterClosed().subscribe(() => {
      this._getFetchers();
    });
  }

  public openEditDialog(fetcher: FetcherApiModel): void {
    this.dialog.open(EditFetcherDialogComponent, {
      data: fetcher,
    });
  }

  public openDeleteFetcherDialog(fetcher: FetcherApiModel): void {
    this.dialog.open(DeleteFetcherDialogComponent, {
      data: fetcher,
    });
  }

  private _getFetchers(): void {
    this._fetcherService.getFetchers().subscribe((result: FetcherApiModel[]) =>  this.dataSource = result);
  }
}
