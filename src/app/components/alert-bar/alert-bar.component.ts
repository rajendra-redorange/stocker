import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MAT_SNACK_BAR_DATA,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-alert-bar',
  templateUrl: './alert-bar.component.html',
  styleUrls: ['./alert-bar.component.scss'],
})
export class AlertBarComponent implements OnInit, OnDestroy {
  alertIconType: string;
  alertBarHeading: string;
  progressValue = 0;
  barColor: string;
  successLabel = 'Success';
  errorLabel = 'Error';
  infoLabel = 'Info';
  timerSubscription: Subscription;
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data,
    private snackbar: MatSnackBar,
    @Inject(MAT_SNACK_BAR_DEFAULT_OPTIONS) public config
  ) {}

  ngOnInit(): void {
    this.getAlertIconType(this.data);
    this.progressValue = 0;
    this.timerSubscription = interval(50).subscribe(() => {
      this.progressValue += 50 / (this.config.duration / 100);
      if (this.progressValue >= 7000) {
        this.timerSubscription.unsubscribe();
      }
    });
  }

  closeSnackbar(): void {
    this.snackbar.dismiss();
  }

  getAlertIconType(data): void {
    if (data && data.type) {
      switch (data.type) {
        case 'success':
          this.alertIconType = 'check_circle';
          // tslint:disable-next-line: no-string-literal
          this.alertBarHeading = data.title
            ? data.title
            : this.successLabel
            ? this.successLabel
            : '';
          this.barColor = 'success-bar';
          return;
        case 'error':
          this.alertIconType = 'cancel';
          // tslint:disable-next-line: no-string-literal
          this.alertBarHeading = data.title
            ? data.title
            : this.errorLabel
            ? this.errorLabel
            : '';
          this.barColor = 'error-bar';
          return;
        case 'info':
          this.alertIconType = 'info';
          // tslint:disable-next-line: no-string-literal
          this.alertBarHeading = data.title
            ? data.title
            : this.infoLabel
            ? this.infoLabel
            : '';
          this.barColor = 'info-bar';
          return;
        default:
          this.alertIconType = 'error';
          // tslint:disable-next-line: no-string-literal
          this.alertBarHeading = data.title
            ? data.title
            : this.errorLabel
            ? this.errorLabel
            : '';
          this.barColor = 'warn-bar';
      }
    }
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
