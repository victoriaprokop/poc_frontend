import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FetcherApiModel } from '../../models/fetcher-api-model';
import { FetcherPostRequest } from '../../models/fetcher-post-request';
import { FetcherService } from '../../services/fetcher.service';

@Component({
  selector: 'app-add-fetcher-dialog',
  templateUrl: './add-fetcher-dialog.component.html',
  styleUrls: ['./add-fetcher-dialog.component.scss']
})
export class AddFetcherDialogComponent {
  public protocolOptions = [
    {
      protocol: 'IMAP',
      port: '143'
    },
    {
      protocol: 'sIMAP4',
      port: '993'
    },
    {
      protocol: 'POP3',
      port: '110'
    },
    {
      protocol: 'sPOP3',
      port: '995'
    }
  ];
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
    description: new FormControl(''),
    address: new FormControl('', Validators.required),
    domains: new FormControl(''),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    protocol: new FormControl('', Validators.required),
    port: new FormControl('', Validators.required),
    mailbox: new FormControl('inbox', Validators.required),
    quick_delete: new FormControl(true, Validators.required),
    time_limit: new FormControl(0, [Validators.required, Validators.min(0)]),
    active: new FormControl(false)
  });

  constructor(
    private _fetcherService: FetcherService,
    private _dialogRef: MatDialogRef<AddFetcherDialogComponent>
  ) {}

  public addFetcher() {
    const form: any = this.fetcherDataForm;

    form.controls.mailbox.enable();

    const newFetcherData: FetcherPostRequest = {
      name: form.value.name,
      server: form.value.address,
      description: form.value.description,
      username: form.value.username,
      password: form.value.password,
      protocol: form.value.protocol,
      port: form.value.port,
      quick_delete: form.value.quick_delete,
      active: form.value.active,
      time_limit: form.value.time_limit,
      mailbox: form.value.mailbox,
      domains: form.value.domains,
    }

    if (form.controls.mailbox.value === 'inbox') {
      this.fetcherDataForm.controls.mailbox.disable();
    }

    this._fetcherService.createFetcher(newFetcherData).subscribe((fetcher: FetcherApiModel) => {
      this._dialogRef.close(fetcher);
    });
  }

  public onProtocolValueChange(value: any) {
    const port = this.protocolOptions.find((o) => o.protocol === value)?.port;

    this.fetcherDataForm.controls.port.setValue(port || '');

    if (value === 'POP3' || value ===  'sPOP3') {
      this.fetcherDataForm.controls.mailbox.setValue('inbox');
      this.fetcherDataForm.controls.mailbox.disable();
    } else {
      this.fetcherDataForm.controls.mailbox.enable();
    }
  }
}
