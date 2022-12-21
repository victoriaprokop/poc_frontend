import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetcherApiModel } from '../../models/fetcher-api-model';

@Component({
  selector: 'app-edit-fetcher-dialog',
  templateUrl: './edit-fetcher-dialog.component.html',
  styleUrls: ['./edit-fetcher-dialog.component.scss']
})
export class EditFetcherDialogComponent implements OnInit {
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FetcherApiModel
  ) {}

  ngOnInit(): void {
    console.log(this.data);

    debugger
  }
}
