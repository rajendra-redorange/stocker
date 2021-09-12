import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StockerServiceMock } from './stocker.mock.service';
import { Stocker } from './stocker.model';
import { AlertBarComponent } from './components/alert-bar/alert-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  stocksSubsScription: Subscription;
  stockSubsScription: Subscription;
  stocksData: Stocker[] = [];
  successMessage;
  errorMessage;
  timeInterval = 60000;
  title = 'stocker';
  showStackForm = false;

  constructor(
    private stService: StockerServiceMock,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.pullStocks();
  }

  pullStocks(): void {
    this.stocksSubsScription = this.stService.getStocker().subscribe(
      (stocksData: Stocker[]) => {
        this.stocksData = stocksData;
      },
      (error) => {
        this.errorMessage = 'Some error occured';
        this.snackBar.openFromComponent(AlertBarComponent, {
          data: {
            type: 'error',
            message: this.errorMessage ? this.errorMessage : '',
          },
          panelClass: 'error-snackbar',
        });
      }
    );
  }

  pullStock(index: number): void {
    this.stockSubsScription = this.stService
      .pullStock(this.stocksData[index])
      .subscribe((stocksData: Stocker) => {
        this.stocksData[index].value = stocksData.value;
        this.stocksData[index].storeStockValue(stocksData.value);
      });
  }

  addStocks(stock: Stocker): void {
    this.stService.addStock(stock).subscribe(
      (result) => {
        this.stocksData.push(stock);
        this.showStackForm = false;
        this.successMessage = 'Stock added successfully';
        this.snackBar.openFromComponent(AlertBarComponent, {
          data: {
            type: 'success',
            message: 'Stock added successfully' ? this.successMessage : '',
          },
          panelClass: 'success-snackbar',
        });
      },
      (error) => {
        this.showStackForm = false;
        this.snackBar.openFromComponent(AlertBarComponent, {
          data: {
            type: 'error',
            message: error.message ? error.message : 'Some Error Occured',
          },
          panelClass: 'error-snackbar',
        });
      }
    );
  }

  markForPull(event, index: number): void {
    if (event.checked) {
      this.stocksData[index].track = true;
      this.stocksData[index].setStartTime();
      this.stocksData[index].storeStockValue(this.stocksData[index].value);
      this.stocksData[index].timeoutTimer = setInterval(() => {
        this.stocksData[index].setPullTime();
        this.pullStock(index);
      }, this.timeInterval);
    } else {
      this.stocksData[index].track = false;
      this.stocksData[index].resetStartTime();
      this.stocksData[index].resetStockValues();
      clearInterval(this.stocksData[index].timeoutTimer);
    }
  }

  hideForm(status: any): void {
    this.showStackForm = false;
  }

  toggleStockForm(): void {
    this.showStackForm = !this.showStackForm;
  }

  clearTimeIntervals(): void {
    if (this.stocksData && this.stocksData.length > 0) {
      this.stocksData.forEach((element) => {
        if (element.timeoutTimer) {
          clearInterval(element.timeoutTimer);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.stockSubsScription.unsubscribe();
    this.stocksSubsScription.unsubscribe();
    this.clearTimeIntervals();
  }
}
