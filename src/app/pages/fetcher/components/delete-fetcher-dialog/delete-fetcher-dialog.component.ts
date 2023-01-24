import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetcherApiModel } from '../../models/fetcher-api-model';
import { FetcherService } from '../../services/fetcher.service';

@Component({
  selector: 'app-delete-fetcher-dialog',
  templateUrl: './delete-fetcher-dialog.component.html',
  styleUrls: ['./delete-fetcher-dialog.component.scss']
})
export class DeleteFetcherDialogComponent {
  public namesToDisplay: string = this.data.length === 1 ? this.data[0].name : this.data.map(fetcher => fetcher.name).join(', ');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FetcherApiModel[],
    private _fetcherService: FetcherService,
    private _dialogRef: MatDialogRef<DeleteFetcherDialogComponent>
  ) {}

  deleteFetcher() {
    if (this.data.length > 1) {
      this._fetcherService.deleteMultipleFetchers(this.data.map(fetcher => fetcher.id)).subscribe(() => this._dialogRef.close(this.data));
    } else {
      this._fetcherService.deleteFetcher(this.data[0].id).subscribe(() => this._dialogRef.close(this.data));
    }
  }
}
