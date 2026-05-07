import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { Observable, startWith, switchMap } from 'rxjs';
import {
  AddressSuggestion,
  AddressService,
} from 'src/app/service/address.service';

@Component({
  standalone: true,
  selector: 'app-address-autocomplete',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
  ],
  template: `
    <mat-form-field appearance="fill" style="width: 100%;">
      <mat-label>Adresse</mat-label>
      <input
        type="text"
        matInput
        [formControl]="query"
        [matAutocomplete]="auto"
      />

      <mat-autocomplete
        #auto="matAutocomplete"
        (optionSelected)="select($event.option.value)"
      >
        <mat-option *ngFor="let s of suggestions$ | async" [value]="s.full">
          {{ s.full }}
        </mat-option>
      </mat-autocomplete>
    </mat-form-field>
  `,
})
export class AddressAutocompleteComponent {
  @Output() addressSelected = new EventEmitter<AddressSuggestion>();

  query = new FormControl('');
  suggestions$: Observable<AddressSuggestion[]> = this.query.valueChanges.pipe(
    startWith(''),
    switchMap((q) => this.addressService.search(q || '')),
  );

  constructor(private addressService: AddressService) {}

  select(full: string) {
    this.addressSelected.emit({ full });
  }
}
