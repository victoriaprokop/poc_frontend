import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetcherService } from '../../services/fetcher.service';

@Component({
  selector: 'app-schedule-production-dialog',
  templateUrl: './schedule-production-dialog.component.html',
  styleUrls: ['./schedule-production-dialog.component.scss']
})
export class ScheduleProductionDialogComponent implements OnInit {
  public fetcherUptime: { key: boolean, value: string }[] = [
    {
      key: false,
      value: "Always run this fetcher (preffered)"
    },
    {
      key: true,
      value: "Schedule daily runtime"
    }
  ];

  public scheduleForm = new FormGroup({
    fetcherUptime: new FormControl<boolean>(false, Validators.required),
    description: new FormControl<string>('', Validators.required),
    shutdown: new FormControl<string>('', Validators.required),
    reactivation: new FormControl<string>('', Validators.required),
  });

  public selectedDays: number[] = [];
  public fetcherschedule: any = undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) private _fetcherId: number,
    private _fetcherService: FetcherService
  ) {}

  ngOnInit(): void {}

  public save() {
    const request = {
      fetcher_id: this._fetcherId,
      downtime_days: this.selectedDays.join(),
      downtime_start: this.scheduleForm.value.shutdown,
      downtime_end: this.scheduleForm.value.reactivation
    }

    this._fetcherService.createFetcherschedule(request).subscribe();
  }
}
