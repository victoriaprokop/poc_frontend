import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
      value: "Always run this fetcher (preferred)"
    },
    {
      key: true,
      value: "Schedule daily downtime"
    }
  ];

  public scheduleForm = new FormGroup({
    fetcherUptime: new FormControl<boolean>(this.data.schedule ? true : false, Validators.required),
    shutdown: new FormControl<string>(
      this.data.schedule ? this.transformTimeTo12(this.data.schedule.downtime_start) : '', 
      Validators.required
    ),
    reactivation: new FormControl<string>(
      this.data.schedule ? this.transformTimeTo12(this.data.schedule.downtime_end) : '', 
      Validators.required
    ),
  });

  public selectedDays: number[] = [];
  public fetcherschedule: any = undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _fetcherService: FetcherService,
    private _dialogRef: MatDialogRef<ScheduleProductionDialogComponent>
  ) {}

  ngOnInit(): void {
    this.selectedDays = this.data.schedule?.downtime_days.split(',').map(Number) || [];
  }

  public save() {
    const request = {
      fetcher_id: this.data.fetcherId,
      downtime_days: this.selectedDays.join(),
      downtime_start: this.transformTimeTo24(this.scheduleForm.value.shutdown),
      downtime_end: this.transformTimeTo24(this.scheduleForm.value.reactivation)
    }

    this._fetcherService.createFetcherschedule(request).subscribe(() => this._dialogRef.close(true));
  }

  private transformTimeTo12(time: any) {
    const hours = time.split(':')[0];
    const minutes = time.split(':')[1];

    const transformedTime = (hours > 12 ? hours - 12 : hours) + ':' + minutes + ' ' + (hours >= 12 ? 'PM' : 'AM');

    return transformedTime;
  }

  private transformTimeTo24(time: any) {
    let transformedTime = time.split(' ')[0];
    const hours = Number(transformedTime.split(':')[0]);

    if (time.includes('PM')) {
      transformedTime = (hours === 12 ? hours : hours + 12) + ':' + transformedTime.split(':')[1];
    }

    if (time.includes('AM') && hours === 12) {
      transformedTime = '00:' + transformedTime.split(':')[1]
    }

    return transformedTime;
  }
}
