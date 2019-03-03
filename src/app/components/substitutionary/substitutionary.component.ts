import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-substitutionary',
  templateUrl: './substitutionary.component.html',
  styleUrls: ['./substitutionary.component.sass'],
})
export class SubstitutionaryComponent implements OnInit {
  punishment = {
    socialService: {
      totalYears: 0,
      totalMonths: 0,
      doneHours: 0,
      doneMinutes: 0,
      monthlyRate: 20,
      countedDays: 0,
    },
    fine: {
      rates: 0,
      rateHeight: 10,
      paid: 0,
      countedRates: 0,
      fineChangedToSocialService: 0,
      fineToSocialService: false,
    },
    results: {
      show: false,
      main: null,
      totalHours: 0,
      undoneHours: 0,
      punishmentLeftDays: 0,
      workedFine: 0,
    },
    selectedSocial: true,
  };

  constructor(private location: Location) {}

  ngOnInit() {}

  enableSocialServiceForm() {
    this.punishment.fine.fineToSocialService = !this.punishment.fine.fineToSocialService;
    if (this.punishment.fine.fineToSocialService) {
      const { rates, rateHeight, paid, countedRates } = this.punishment.fine;
      this.punishment.fine.fineChangedToSocialService =
        rates * rateHeight - countedRates * rateHeight - paid;
      this.punishment.socialService.totalMonths = Math.ceil(
        this.punishment.fine.fineChangedToSocialService / (rateHeight * 10),
      );
    }
  }

  onSubmitSocial({ value }) {
    const { totalMonths, totalYears, doneHours, monthlyRate, countedDays } = value;
    if (totalYears) {
      this.punishment.results.totalHours = (totalYears * 12 + totalMonths) * monthlyRate;
      this.punishment.results.undoneHours = this.punishment.results.totalHours - doneHours;
      this.punishment.results.punishmentLeftDays = Math.floor(
        (this.punishment.results.undoneHours * 365) / (monthlyRate * 12),
      );
      this.punishment.results.main = Math.floor(
        (((totalYears * 12 + totalMonths) * monthlyRate - doneHours) * 365) /
          (monthlyRate * 12) /
          2 -
          Math.ceil(countedDays / 2),
      );
    } else {
      this.punishment.results.totalHours = totalMonths * monthlyRate;
      this.punishment.results.undoneHours = totalMonths * monthlyRate - doneHours;
      this.punishment.results.punishmentLeftDays = Math.floor(
        (totalMonths * monthlyRate - doneHours) * (30 / monthlyRate),
      );
      this.punishment.results.main = Math.floor(
        ((totalMonths * monthlyRate - doneHours) * (30 / monthlyRate)) / 2 -
          Math.ceil(countedDays / 2),
      );
    }
    this.punishment.results.show = true;
  }

  onSubmitFine({ value }) {
    if (this.punishment.fine.fineToSocialService) {
      const { rates, rateHeight, paid, totalMonths, monthlyRate, doneHours, countedRates } = value;
      const { fineChangedToSocialService } = value;

      this.punishment.results.main = Math.floor(
        (rates * rateHeight -
          countedRates * rateHeight -
          paid -
          (doneHours * fineChangedToSocialService) / (totalMonths * monthlyRate)) /
          rateHeight /
          2,
      );
      this.punishment.results.workedFine =
        (doneHours * fineChangedToSocialService) / (totalMonths * monthlyRate);
    } else {
      const { rates, rateHeight, paid, countedRates } = value;
      this.punishment.results.main = Math.floor(
        (rates * rateHeight - countedRates * rateHeight - paid) / rateHeight / 2,
      );
    }
    this.punishment.results.show = true;
  }

  clearForms() {
    // this.punishment.socialService.totalYears = 0;
    this.punishment.socialService.totalYears = 0;
    this.punishment.socialService.totalMonths = 0;
    this.punishment.socialService.countedDays = 0;
    this.punishment.socialService.doneHours = 0;
    this.punishment.fine.countedRates = 0;
    this.punishment.fine.fineChangedToSocialService = 0;
    this.punishment.fine.fineToSocialService = false;
    this.punishment.fine.paid = 0;
    this.punishment.fine.rates = 0;
    this.punishment.results.main = null;
    this.punishment.results.show = false;
    this.punishment.results.punishmentLeftDays = 0;
    this.punishment.results.workedFine = 0;
    this.punishment.results.undoneHours = 0;
    this.punishment.results.totalHours = 0;
  }

  goBack() {
    this.location.back();
  }
}
