import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, ValidatorFn, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-deductions',
  templateUrl: './deductions.component.html',
  styleUrls: ['./deductions.component.sass'],
})
export class DeductionsComponent implements OnInit {
  deductionForm = this.fb.group(
    {
      punishmentSize: [null, [Validators.required, Validators.min(1), Validators.max(24)]],
      monthlyRate: [20, [Validators.required, this.checkRate()]],
      serviceDone: [null, Validators.required],
    },
    { validator: this.checkSum() },
  );

  results = {
    visible: false,
    fullMonthsLeft: 0,
    monthlyDeductions: 0,
    lastMonthDeductions: 0,
  };

  constructor(private location: Location, private fb: FormBuilder) {}

  ngOnInit() {}

  goBack() {
    this.location.back();
  }

  get monthlyRate(): AbstractControl {
    return this.deductionForm.get('monthlyRate');
  }

  get punishmentSize(): AbstractControl {
    return this.deductionForm.get('punishmentSize');
  }

  checkRate(): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value < 20 || control.value > 40
        ? {
            range:
              'Miesięczny wymiar kary musi zawierać się przedziale 20-40 godzin. (art. 35 par. 1 kk)',
          }
        : {};
    };
  }

  checkSum() {
    return (control: FormGroup) => {
      const size: number = control.get('punishmentSize').value;
      const rate: number = control.get('monthlyRate').value;
      const done: number = control.get('serviceDone').value;

      if (size && rate && done) {
        return size * rate <= control.controls.serviceDone.value
          ? {
              max: `Wykonane godziny przekraczają całkowity wymiar kary tj. ${size *
                rate} godzin! `,
            }
          : {};
      }
    };
  }

  getErrors(errorName: string): string {
    return this.deductionForm.getError(errorName);
  }

  calculcateDeductions(form) {
    const { punishmentSize, monthlyRate, serviceDone } = form;
    console.log(punishmentSize, monthlyRate, serviceDone);
    const left = punishmentSize * monthlyRate - serviceDone;

    if (left % monthlyRate !== 0) {
      this.results.lastMonthDeductions = (left % monthlyRate) / 2;
      this.results.fullMonthsLeft = Math.floor(left / monthlyRate);
      this.results.monthlyDeductions = monthlyRate / 2;
    } else {
      this.results.fullMonthsLeft = left / monthlyRate;
      this.results.monthlyDeductions = monthlyRate / 2;
    }
  }

  onSubmit = () => {
    this.clearResults();
    this.calculcateDeductions(this.deductionForm.value);
    this.results.visible = true;
  };

  clearForm = () => {
    this.deductionForm.reset();
    this.deductionForm.patchValue({
      monthlyRate: 20,
    });
  };

  clearResults = () => {
    Object.keys(this.results).map(key => (this.results[key] = null));
  };
}
