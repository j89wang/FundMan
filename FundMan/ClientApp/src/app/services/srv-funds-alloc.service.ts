import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentUrlService } from '../services/environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class FundsAllocService {

  constructor(private http: HttpClient, private environment: EnvironmentUrlService  ) { }

  public getData(route: string) {
    return this.http.get(this.createCompleteRoute(route, this.environment.urlAddress));
  }

  public update(route: string, body) {
    const rt = this.createCompleteRoute(route, this.environment.urlAddress);
    return this.http.post(rt, body, this.generateHeaders());
  }

  public delete(route: string, symbol: string) {
    const rt = this.createCompleteRoute(route, this.environment.urlAddress)  + '/' + symbol;
    return this.http.delete(rt);
  }

  private createCompleteRoute(route: string, envAddress: string) {
    console.log(`${envAddress}/${route}`);
    return `${envAddress}/${route}`;
  }

  private generateHeaders() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }
}
