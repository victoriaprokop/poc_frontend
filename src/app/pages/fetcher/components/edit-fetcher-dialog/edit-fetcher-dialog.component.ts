import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-fetcher-dialog',
  templateUrl: './edit-fetcher-dialog.component.html',
  styleUrls: ['./edit-fetcher-dialog.component.scss']
})
export class EditFetcherDialogComponent {
  public protocolOptions = ["IMAP", "IMAP2", "IMAP3", "IMAP4"];
  public deletionOptions: { key: string, value: string }[] = [
    {
      key: "onceBacked",
      value: "Delete Emails Once Backed Up (More Secure)"
    },
    {
      key: "immediately",
      value: "Delete Emails Immediately (Faster)"
    }
  ];
}
