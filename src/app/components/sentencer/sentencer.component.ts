import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sentencer',
  templateUrl: './sentencer.component.html',
  styleUrls: ['./sentencer.component.sass'],
})
export class SentencerComponent implements OnInit {
  sentencer = this.fb.group({
    sentenceDetails: this.fb.group({
      changed: false,
      combined: false,
      details: this.fb.group({
        court: 'sta',
        depart: 'VI',
        sign: '',
        date: '',
        legalValid: '',
      }),
    }),
    punishmentDetails: this.fb.group({
      prison: false,
      service: false,
      fine: false,
      expenses: false,
      probation: false,
      fee: false,
      driveBan: false,
      alimony: false,
      damageRepair: false,
      alcoRefrain: false,
      drugRefrain: false,
      behave: false,
      compensation: false,
      crimeBenef: false,
      publicSentence: false,
    }),
  });

  @ViewChild('signature') signInput: ElementRef;

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.signInput.nativeElement.focus();
    console.log(this.sentencer);
  }

  get changed() {
    return this.sentencer.get('sentenceDetails').get('changed').value;
  }

  get prisonForm() {
    return this.sentencer.get('punishmentDetails').get('prisonForm').value;
  }

  get combined() {
    return this.sentencer.get('sentenceDetails').get('combined').value;
  }

  get sentenceDetails() {
    return this.sentencer.get('sentenceDetails') as FormGroup;
  }

  get punishmentDetails() {
    return this.sentencer.get('punishmentDetails').value;
  }

  get punishmentDetailsControls() {
    return this.sentencer.get('punishmentDetails') as FormGroup;
  }

  changeHandler = (enabled: boolean, control: string) => {
    switch (control) {
      case 'sentenceChanged':
        enabled ? this.addChangingSentence() : this.removeChangingSentence();
        break;
      case 'prison':
        enabled ? this.addPrison() : this.removePrison();
        console.log(this.sentencer);
        break;
    }
  };

  addChangingSentence = () => {
    this.sentenceDetails.addControl(
      'detailsChangingSentence',
      this.fb.group({
        court: 'sgSo',
        depart: 'VI',
        sign: '',
        date: '',
      }),
    );
  };

  removeChangingSentence() {
    this.sentenceDetails.removeControl('detailsChangingSentence');
  }

  addPrison() {
    this.punishmentDetailsControls.addControl(
      'prisonForm',
      this.fb.group({
        probation: false,
        accounted: false,
        length: 6,
        probationLength: { value: null, disabled: true },
        countedDays: { value: null, disabled: true },
      }),
    );
  }

  removePrison() {
    this.punishmentDetailsControls.removeControl('prisonForm');
  }

  toggle(control: string, controlGroup: string): void {
    // console.log(this.sentencer.get('punishmentDetails').value);
    // console.log(this.sentencer.controls[controlGroup]['controls'][control].value);
    this.sentencer.controls[controlGroup].patchValue({
      [control]: !this.sentencer.controls[controlGroup]['controls'][control].value,
    });
  }
}
