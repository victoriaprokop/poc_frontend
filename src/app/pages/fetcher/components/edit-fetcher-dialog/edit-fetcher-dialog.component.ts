import { Component, Inject, OnInit } from '@angular/core';
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
export class EditFetcherDialogComponent implements OnInit {
  public protocolOptions = [
    {
      protocol: 'IMAP4',
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
    name: new FormControl(this.data.name, Validators.required),
    description: new FormControl(this.data.description),
    address: new FormControl(this.data.server, Validators.required),
    domains: new FormControl(this.data.domains),
    username: new FormControl(this.data.username, Validators.required),
    password: new FormControl(this.data.password, Validators.required),
    protocol: new FormControl(this.data.protocol, Validators.required),
    port: new FormControl(this.data.port, Validators.required),
    mailbox: new FormControl(this.data.mailbox || 'inbox', Validators.required),
    quick_delete: new FormControl(this.data.quick_delete, Validators.required),
    time_limit: new FormControl(this.data.time_limit, [Validators.required, Validators.min(0)]),
    active: new FormControl(this.data.active)
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FetcherApiModel,
    private _fetcherService: FetcherService,
    private _dialogRef: MatDialogRef<EditFetcherDialogComponent>
  ) {}

  ngOnInit(): void {
    this.setMailboxAsInbox(this.fetcherDataForm.controls.protocol.value);
  }

  public updateFetcher() {
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
      domains: form.value.domains
    }

    if (form.controls.mailbox.value === 'inbox') {
      this.fetcherDataForm.controls.mailbox.disable();
    }

    this._fetcherService.updateFetcher(this.data.id, newFetcherData).subscribe(() => this._dialogRef.close(newFetcherData.name));
  }

  public onProtocolValueChange(value: any) {
    const form = this.fetcherDataForm;
    const port = this.protocolOptions.find((o) => o.protocol === value)?.port;

    form.controls.port.setValue(port || '');

    this.setMailboxAsInbox(value);
  }

  private setMailboxAsInbox(protocol: string | null) {
    const form = this.fetcherDataForm;

    if (protocol === 'POP3' || protocol ===  'sPOP3') {
      form.controls.mailbox.setValue('inbox');
      form.controls.mailbox.disable();
    } else {
      form.controls.mailbox.enable();
    }
  }
}
