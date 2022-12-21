import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetcherApiModel } from '../../models/fetcher-api-model';
import { FetcherPostRequest } from '../../models/fetcher-post-request';
import { FetcherService } from '../../services/fetcher.service';

@Component({
  selector: 'app-edit-fetcher-dialog',
  templateUrl: './edit-fetcher-dialog.component.html',
  styleUrls: ['./edit-fetcher-dialog.component.scss']
})
export class EditFetcherDialogComponent {
  public protocolOptions = ["IMAP", "IMAP2", "IMAP3", "IMAP4"];
  public deletionOptions: { title: string, value: boolean }[] = [
    {
      title: "Delete Emails Once Backed Up (More Secure)",
      value: false
    },
    {
      title: "Delete Emails Immediately (Faster)",
      value: true
    }
  ];

  public fetcherDataForm = new FormGroup({
    name: new FormControl(this.data.name, Validators.required),
    description: new FormControl(this.data.description, Validators.required),
    address: new FormControl(this.data.server, Validators.required),
    domains: new FormControl(this.data.domains, Validators.required),
    username: new FormControl(this.data.username, Validators.required),
    password: new FormControl('', Validators.required),
    protocol: new FormControl(this.data.protocol, Validators.required),
    port: new FormControl(this.data.port, Validators.required),
    mailbox: new FormControl(this.data.mailbox, Validators.required),
    quick_delete: new FormControl(this.data.quick_delete, Validators.required),
    time_limit: new FormControl(this.data.time_limit, Validators.required),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FetcherApiModel,
    private _fetcherService: FetcherService,
    private _dialogRef: MatDialogRef<EditFetcherDialogComponent>
  ) {}

  public updateFetcher() {
    const formValue: any = this.fetcherDataForm.value;

    const newFetcherData: FetcherPostRequest = {
      name: formValue.name,
      server: formValue.address,
      description: formValue.description,
      username: formValue.username,
      password: formValue.password,
      protocol: formValue.protocol,
      port: formValue.port,
      quick_delete: formValue.quick_delete,
      active: true,
      time_limit: formValue.time_limit,
      mailbox: formValue.mailbox,
      domains: formValue.domains
    }

    this._fetcherService.updateFetcher(this.data.id, newFetcherData).subscribe(() => this._dialogRef.close(true));
  }
}
