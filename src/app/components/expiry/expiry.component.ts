import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-expiry',
  templateUrl: './expiry.component.html',
  styleUrls: ['./expiry.component.sass'],
})
export class ExpiryComponent implements OnInit {
  submitted = false;
  result = null;
  expiryForm = this.fb.group({
    legalValid: ['', Validators.required],
    punishmentType: ['fineOrSocialCriminal'],
    isSuspended: [false],
    imprisoned: [false],
  });

  get prisonServed() {
    return this.expiryForm.get('prisonServed') as FormArray;
  }

  getImprisonedValue() {
    return this.expiryForm.get('imprisoned').value;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  onSubmit() {
    this.calculateExpiration(this.expiryForm.value);
  }

  addImprisonment() {
    this.prisonServed.push(
      this.fb.group(
        {
          from: [
            '',
            [Validators.required, this.dateAfterLegalValidity(this.expiryForm.get('legalValid'))],
          ],
          to: ['', Validators.required],
        },
        { validator: this.dateLessThan('from', 'to') },
      ),
    );
  }

  removeImprisonment(i) {
    this.prisonServed.removeAt(i);
  }

  addImprisonmentArray() {
    this.expiryForm.addControl(
      'prisonServed',
      this.fb.array([
        this.fb.group(
          {
            from: [
              '',
              [Validators.required, this.dateAfterLegalValidity(this.expiryForm.get('legalValid'))],
            ],
            to: ['', Validators.required],
          },
          { validator: this.dateLessThan('from', 'to') },
        ),
      ]),
    );
  }

  removeImprisonmentArray() {
    this.expiryForm.removeControl('prisonServed');
  }

  dateAfterLegalValidity(legalValid): ValidatorFn {
    return control => {
      const from: string = control.value;
      if (from) {
        if (legalValid.value > from) {
          return {
            legal: `Jeżeli początek odbywanej kary przypada na dzień przed prawomocnością wyroku to wówczas za początek okresu przerywającego bieg przedawnienia należy przyjać datę prawomocności wyroku a więc ${
              legalValid.value
            }`,
          };
        } else {
          return {};
        }
      }
    };
  }

  dateLessThan(from: string, to: string) {
    return group => {
      const f = group.controls[from];
      const t = group.controls[to];
      if (f.value && t.value) {
        if (f.value > t.value) {
          return {
            dates: 'Data początku odbywanej kary nie może być późniejsza niż data jej rozpoczęcia',
          };
        } else {
          return {};
        }
      }
    };
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
    if (prisonServed !== undefined) {
      prisonServed.map(imprisonment => {
        const to: any = new Date(imprisonment.to);
        const from: any = new Date(imprisonment.from);

        imprisonment.total = to - from;
        imprisonment.totalDays = imprisonment.total / 86400000;

        expiration.prisonServed += imprisonment.total;
      });
    }

    this.result = new Date(
      new Date(legalValid).valueOf() +
        expiration[punishmentType] +
        expiration.isSuspended +
        expiration.prisonServed,
    ).toLocaleDateString();
    this.submitted = true;
  }

  clearForm() {
    this.expiryForm.reset();
    this.expiryForm.patchValue({
      punishmentType: ['fineOrSocialCriminal'],
      isSuspended: false,
      imprisoned: false,
    });

    this.removeImprisonmentArray();
  }
  onChange() {
    this.submitted = false;
    this.result = null;
  }

  test() {
    console.warn(this.expiryForm);
  }
}
