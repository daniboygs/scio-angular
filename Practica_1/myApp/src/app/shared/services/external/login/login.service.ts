import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Constant } from '../../../classes/Constant';
import { LoginParams } from '../../../models/LoginParams';
import { Register } from '../../../models/Register';

import { Headers, RequestOptions } from '@angular/http';


@Injectable()
export class LoginService {

  constructor(
    private _http: Http
    ) { }

    /**
     * Call to live API
     * @param body
     */
    login(body: LoginParams): Observable<Register> {
      return this._http.post(Constant.API + 'auth/login', body, Constant.options) // ...using post request
        .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
        .catch((error: any) => Observable.throw(error || 'Server error')); // ...errors if any
    }

}

