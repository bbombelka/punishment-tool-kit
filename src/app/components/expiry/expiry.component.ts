import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-expiry',
  templateUrl: './expiry.component.html',
  styleUrls: ['./expiry.component.sass'],
})
export class ExpiryComponent implements OnInit {
  expiryForm = this.fb.group({
    legalValid: ['', Validators.required],
    punishmentType: ['fineOrSocialCriminal'],
    isSuspended: [false],
    imprisoned: [false],
  });

  get prisonServed() {
    return this.expiryForm.get('prisonServed') as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  getImprisonedValue() {
    return this.expiryForm.get('imprisoned').value;
  }

  calculateExpiration(value) {
    const { legalValid, punishmentType, isSuspended, imprisoned, prisonServed } = value;
    const expiration = {
      fineOrSocialMinor: 94608000000,
      fineOrSocialCriminal: 315360000000,
      punishmentUnderAndFive: 473040000000,
      punishmentOverFive: 946080000000,
      isSuspended: isSuspended ? 315360000000 : 0,
      prisonServed: 0,
    };
    // if (prisonServed !== undefined) {
    //   prisonServed.map(
    //     imprisonment =>
    //       (expiration.prisonServed += new Date(imprisonment.to) - new Date(imprisonment.from)),
    //   );
    // }

    console.log(
      new Date(
        new Date(legalValid).valueOf() +
          expiration[punishmentType] +
          expiration.isSuspended +
          expiration.prisonServed,
      ),
    );
  }

  onSubmit() {
    this.calculateExpiration(this.expiryForm.value);
    console.warn(this.expiryForm.value);
  }

  addImprisonment() {
    this.prisonServed.push(
      this.fb.group({
        from: [''],
        to: [''],
      }),
    );
  }

  removeImprisonment(i) {
    this.prisonServed.removeAt(i);
  }

  removeAllImprisonment() {
    do {
      this.prisonServed.removeAt(0);
    } while (this.prisonServed.length > 0);
  }

  addImprisonmentArray() {
    this.expiryForm.addControl(
      'prisonServed',
      this.fb.array([
        this.fb.group({
          from: '',
          to: '',
        }),
      ]),
    );
  }

  removeImprisonmentArray() {
    this.expiryForm.removeControl('prisonServed');
  }
}
