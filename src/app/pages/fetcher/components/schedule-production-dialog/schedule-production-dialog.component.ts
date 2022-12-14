import { Component } from '@angular/core';

@Component({
  selector: 'app-schedule-production-dialog',
  templateUrl: './schedule-production-dialog.component.html',
  styleUrls: ['./schedule-production-dialog.component.scss']
})
export class ScheduleProductionDialogComponent {
  public fetcherUptime: { key: string, value: string }[] = [
    {
      key: "runThis",
      value: "Always run this fetcher (preffered)"
    },
    {
      key: "immediately",
      value: "Schedule daily runtime"
    }
  ];
}
