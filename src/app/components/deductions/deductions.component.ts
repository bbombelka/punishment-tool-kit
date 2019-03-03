import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-deductions',
  templateUrl: './deductions.component.html',
  styleUrls: ['./deductions.component.sass'],
})
export class DeductionsComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit() {}

  goBack() {
    this.location.back();
  }
}
