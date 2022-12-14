import { Component } from '@angular/core';

@Component({
  selector: 'app-add-fetcher-dialog',
  templateUrl: './add-fetcher-dialog.component.html',
  styleUrls: ['./add-fetcher-dialog.component.scss']
})
export class AddFetcherDialogComponent {
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
