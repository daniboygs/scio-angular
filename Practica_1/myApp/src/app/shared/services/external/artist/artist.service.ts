import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Constant } from '../../../classes/Constant';

import { Artist } from '../../../models/Artist';
import { ArtistParams } from '../../../models/ArtistParams';

import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ArtistService {

  constructor(
    private _http: Http
    ) { }

    /**
     * Call to live API
     * @param body
     */

    getArtist(): Observable<Array<ArtistParams>> {
      return this._http.get(Constant.API + 'artists/', Constant.options) // ...using post request
        .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
        .catch((error: any) => Observable.throw(error || 'Server error')); // ...errors if any
    }

    create(body: ArtistParams): Observable<Artist> {
      return this._http.post(Constant.API + 'artists/', body, Constant.options) // ...using post request
        .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
        .catch((error: any) => Observable.throw(error || 'Server error')); // ...errors if any
    }

    update(body: ArtistParams): Observable<Artist> {
      return this._http.put(Constant.API + 'artists/' + body._id, body, Constant.options) // ...using post request
        .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
        .catch((error: any) => Observable.throw(error || 'Server error')); // ...errors if any
    }

    delete(body: ArtistParams): Observable<Artist> {
      return this._http.delete(Constant.API + 'artists/' + body.name, Constant.options) // ...using post request
        .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
        .catch((error: any) => Observable.throw(error || 'Server error')); // ...errors if any
    }

}
