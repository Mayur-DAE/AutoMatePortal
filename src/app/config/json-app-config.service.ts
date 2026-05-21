import { Injectable } from '@angular/core';
import { AppConfig } from './app-config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JsonAppConfigService extends AppConfig {

  constructor(private http: HttpClient) {
    super();
  }

  load() {
    return this.http.get<AppConfig>('app.config.json')
      .toPromise()
      .then((data: any) => {
        this.baseUrl = data.baseUrl;
        this.branchID = data.branchID;  
        this.isPrint=data.isPrint;
        this.isSound=data.isSound;        
        this.externalAPi=data.externalAPi
      })
      .catch(() => {
        console.error('Could not load configuration');
      })
  }
}
