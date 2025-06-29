/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Account } from '../../models/account';
import { AccountCreate } from '../../models/account-create';

export interface CreateAccount$Params {
  
    /**
     * Data for the new account
     */
    body: AccountCreate
}

export function createAccount(http: HttpClient, rootUrl: string, params: CreateAccount$Params, context?: HttpContext): Observable<StrictHttpResponse<Account>> {
  const rb = new RequestBuilder(rootUrl, createAccount.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Account>;
    })
  );
}

createAccount.PATH = '/accounts';
