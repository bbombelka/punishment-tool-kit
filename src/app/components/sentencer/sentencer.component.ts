import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { fbind } from 'q';

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
  });

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    console.log(this.sentencer);
  }

  get changed() {
    return this.sentencer.get('sentenceDetails').get('changed').value;
  }

  get combined() {
    return this.sentencer.get('sentenceDetails').get('combined').value;
  }

  get sentenceDetails() {
    return this.sentencer.get('sentenceDetails') as FormGroup;
  }

  changeHandler = (enabled: boolean) => {
    enabled ? this.addChangingSentence() : this.removeChangingSentence();
  };

  addChangingSentence = () => {
    this.sentenceDetails.addControl(
      'detailsChangingSentence',
      this.fb.group({
        court: 'sg',
        depart: 'VI',
        sign: '',
        date: '',
      }),
    );
  };

  removeChangingSentence() {
    this.sentenceDetails.removeControl('detailsChangingSentence');
  }

  toggle(control: string): void {
    console.log(this.sentencer.controls.sentenceDetails['controls'][control].value);
    this.sentencer.controls.sentenceDetails.patchValue({
      [control]: !this.sentencer.controls.sentenceDetails['controls'][control].value,
    });
  }
}
