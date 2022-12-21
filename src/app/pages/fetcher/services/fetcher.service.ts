import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FetcherApiModel } from '../models/fetcher-api-model';
import { FetcherPostRequest } from '../models/fetcher-post-request';

@Injectable({
  providedIn: 'root'
})
export class FetcherService {
  private apiUrl = environment.apiURL;

  constructor(private _http: HttpClient) { }

  public getFetchers(): Observable<FetcherApiModel[]> {
    return this._http.get<FetcherApiModel[]>(this.apiUrl + '/fetcher');
  }

  public createFetcher(request: FetcherPostRequest) {
    return this._http.post(this.apiUrl + '/fetcher', request);
  }
}
