import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http: HttpClient = inject(HttpClient);
  baseUrl: string = 'https://swagger_link';

  getTestAccounts(){
    return this.http.get(`${this.baseUrl}/accounts/test-accounts`);
  }
}
