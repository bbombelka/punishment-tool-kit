import { Component, OnInit, ViewChild } from '@angular/core';
import { Data } from '../../models/data';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-installments',
  templateUrl: './installments.component.html',
  styleUrls: ['./installments.component.sass', './installments.component.css'],
})
export class InstallmentsComponent implements OnInit {
  toggleInstallmentSplitType = true;
  toggleFirstInstallmentHeight = false;
  installmentType = 'fine';
  @ViewChild('f') private form: NgForm;
  showResults = false;
  data: Data = {
    installmentNumber: 0,
    installmentHeight: 0,
    firstInstallmentHeight: 0,
    lastInstallmentHeight: 0,
    error: null,
  };
  test = 0;
  feeAlert = false;
  fineAlert = false;
  constructor(private location: Location) {}

  ngOnInit() {}

  installmentsByNumber(installmentNumber, balance, firstInstall = 0) {
    if (!firstInstall) {
      this.data.installmentNumber = installmentNumber;
      this.data.installmentHeight = Math.floor(balance / installmentNumber).toFixed(2);
      this.data.firstInstallmentHeight = (
        balance -
        this.data.installmentHeight * (installmentNumber - 1)
      ).toFixed(2);
    } else {
      this.data.firstInstallmentHeight = firstInstall;
      this.data.installmentNumber = installmentNumber;
      this.data.installmentHeight = Math.floor((balance - firstInstall) / (installmentNumber - 1));
      this.data.lastInstallmentHeight =
        (
          balance -
          firstInstall -
          this.data.installmentHeight * (installmentNumber - 1) +
          this.data.installmentHeight
        ).toFixed(2) * 1;
    }
  }

  installmentsByHeight(installmentHeight, balance, firstInstall = 0) {
    if (firstInstall) {
      this.data.installmentNumber = Math.ceil((balance - firstInstall) / installmentHeight) + 1;
      this.data.firstInstallmentHeight = firstInstall;
    } else {
      this.data.installmentNumber = Math.ceil(balance / installmentHeight);
    }

    if (
      (this.data.installmentNumber < 13 && this.installmentType === 'fee') ||
      (this.data.installmentNumber < 37 && this.installmentType === 'fine')
    ) {
      this.data.installmentHeight = installmentHeight;
      this.data.lastInstallmentHeight = (
        balance -
        firstInstall -
        Math.floor((balance - firstInstall) / installmentHeight) * installmentHeight
      ).toFixed(2);
    } else {
      this.installmentType === 'fee'
        ? (this.data.error =
            'Zbyt niska kwota raty. Rata musi wynosić minimalnie ' + (balance / 12).toFixed(2))
        : (this.data.error =
            'Zbyt niska kwota raty. Rata musi wynosić minimalnie ' + (balance / 36).toFixed(2));
    }
  }

  clearValues() {
    this.data.installmentNumber = 0;
    this.data.installmentHeight = 0;
    this.data.firstInstallmentHeight = 0;
    this.data.lastInstallmentHeight = 0;
    this.data.error = null;
  }

  clearValuesForm() {
    this.form.resetForm();
    this.data.error = null;
  }
  onSubmit({ value, valid }) {
    const { courtCharge, fine, fee, installmentType } = value;
    const { firstInstallment, installmentNumber } = value.installmentNumber;
    const { installmentHeight, firstInstallmentInHeightGroup } = value.installmentHeight;
    let balance;
    if (installmentType === 'fine') {
      balance = fine * 1 + courtCharge * 1;
    } else {
      balance = fee;
    }
    if (!this.toggleInstallmentSplitType) {
      this.clearValues();
      this.showResults = true;
      this.installmentsByNumber(installmentNumber, balance, firstInstallment);
    } else {
      this.clearValues();
      this.showResults = true;
      this.installmentsByHeight(installmentHeight, balance, firstInstallmentInHeightGroup);
    }
  }

  validate(input) {
    switch (input.name) {
      case 'installmentNumber': {
        if ((input.value < 2 || input.value > 36) && this.installmentType === 'fine') {
          this.fineAlert = true;
        } else if ((input.value < 2 || input.value > 12) && this.installmentType === 'fee') {
          this.feeAlert = true;
        } else {
          this.feeAlert = false;
          this.fineAlert = false;
        }
      }
    }
  }

  goBack() {
    this.location.back();
  }
}
