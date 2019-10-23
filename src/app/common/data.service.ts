import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private settingService: SettingsService) { }
  getOrders() {
    return this.http.get(this.settingService.apiBaseUrl + "GetOrders");
  }
  getOrder(code) {
    return this.http.get(this.settingService.apiBaseUrl + "GetOrder/" + code);
  }

}

