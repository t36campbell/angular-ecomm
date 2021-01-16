import { Component } from '@angular/core';
import { LocalizeService } from '../../services/localize.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  languageSelected = 'en';
  currencySelected = 'USD';
  unitSelected = 1;
  public constructor(private localizeService: LocalizeService) {
    this.localizeService.setCurrency(this.currencySelected);
    this.localizeService.setUnit(this.unitSelected);
  }
  units: any[] = [
    {value: 'USD', viewValue: 'USD', unit: 1},
    {value: 'EUR', viewValue: 'EUR', unit: 0.8761170492},
    {value: 'JPY', viewValue: 'JPY', unit: 107.0965480988},
    {value: 'GBP', viewValue: 'GBP', unit: 0.7961713685},
  ];

  changeLang(value: string) {
    this.languageSelected = value;
    this.localizeService.setLang(this.languageSelected);
  }
  changeCurrency(value: string, unit: number) {
    this.currencySelected = value;
    this.unitSelected = unit;
    this.localizeService.setCurrency(this.currencySelected);
    this.localizeService.setUnit(this.unitSelected);
  }
}
