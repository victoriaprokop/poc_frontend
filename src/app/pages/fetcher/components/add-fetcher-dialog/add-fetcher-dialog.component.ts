import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FetcherPostRequest } from '../../models/fetcher-post-request';
import { FetcherService } from '../../services/fetcher.service';

@Component({
  selector: 'app-add-fetcher-dialog',
  templateUrl: './add-fetcher-dialog.component.html',
  styleUrls: ['./add-fetcher-dialog.component.scss']
})
export class AddFetcherDialogComponent {
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
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    domains: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    protocol: new FormControl('', Validators.required),
    port: new FormControl('', Validators.required),
    mailbox: new FormControl('', Validators.required),
    quick_delete: new FormControl(true, Validators.required),
    time_limit: new FormControl(0, Validators.required),
  });

  constructor(
    private _fetcherService: FetcherService
  ) {}

  public addFetcher() {
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

    this._fetcherService.createFetcher(newFetcherData).subscribe(
      (result) => {
        console.log(result);
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
