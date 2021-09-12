import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Stocker } from './stocker.model';

@Injectable({
  providedIn: 'root',
})
export class StockerServiceMock {
  stockData: Stocker[] = [];
  stockMockData =
    '[{"id":"694653","t":"GOOG","e":"NASDAQ","l":"1581.84","l_cur":"1581.84","s":"0","ltt":"4:00 PM EDT","lt":"Mar 30, 4:00 PM EDT","c":"+0.11","cp":"0.02","ccol":"chg"}, {"id":"694654","t":"ICICI","e":"NASDAQ","l":"1000.12","l_cur":"1000.12","s":"0","ltt":"4:00 PM EDT","lt":"Mar 30, 4:00 PM EDT","c":"+0.11","cp":"0.02","ccol":"chg"}]';

  getStocker(): Observable<Stocker[]> {
    let stocker: Stocker[] = [];

    this.stockData = stocker = this.parseStocks();

    return of(stocker.slice());
  }

  pullStock(stock: Stocker): Observable<Stocker> {
    const foundStock = this.stockData.find(
      (element) => element.id === stock.id
    );
    const transFormedStock = new Stocker(foundStock.id, foundStock.name);
    transFormedStock.value = this.getRandStockValue();
    return of(transFormedStock);
  }

  getRandStockValue(): number {
    return Math.floor(Math.random() * (10000 + 1));
  }

  parseStocks(): Stocker[] {
    let stocks: Stocker[] = [];

    const mockStockObject: any[] = JSON.parse(this.stockMockData);

    stocks = mockStockObject.map((element) => {
      const stock = new Stocker(element.id, element.t);
      stock.value = parseInt(element['l_cur']);

      return stock;
    });

    return stocks;
  }

  addStock(stock: Stocker): Observable<boolean> {
    const existingStIndex = this.stockData.findIndex(
      (stck) => stck.name === stock.name
    );
    if (existingStIndex !== -1) {
      const error = {
        code: 400,
        message: 'stock already present',
      };
      return throwError(error);
    } else {
      this.stockData.push(stock);
      return of(true);
    }
  }
}
