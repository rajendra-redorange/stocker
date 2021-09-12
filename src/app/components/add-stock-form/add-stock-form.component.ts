import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Stocker } from 'src/app/stocker.model';

@Component({
  selector: 'app-add-stock-form',
  templateUrl: './add-stock-form.component.html',
})
export class AddStockFormComponent implements OnInit {
  @Output() add = new EventEmitter<Stocker>();
  @Output() hide = new EventEmitter<any>();

  stockForm: FormGroup;
  stock: FormControl;
  value: FormControl;

  constructor() {}

  ngOnInit(): void {
    this.setForm();
  }

  setForm(): void {
    this.stock = new FormControl(null, Validators.required);
    this.value = new FormControl(null, Validators.required);

    this.stockForm = new FormGroup({
      stock: this.stock,
      value: this.value,
    });
  }

  hideForm(): void {
    this.hide.emit(true);
  }

  addStockForm(form: FormGroup): void {
    const params = new Stocker(Math.random().toString(), this.stock.value);
    params.value = this.value.value;
    this.add.emit(params);
  }
}
