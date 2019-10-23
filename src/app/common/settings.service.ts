import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private appConfig: any;

  constructor(private http: HttpClient) { }

  async loadAppConfig() {
    const data = await this.http.get('assets/configs/setting.json')
      .toPromise();
    this.appConfig = data;
  }

  // This is an example property ... you can make it however you want.
  get apiBaseUrl() {

    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }

    return this.appConfig.apiBaseUrl;
  }
}
