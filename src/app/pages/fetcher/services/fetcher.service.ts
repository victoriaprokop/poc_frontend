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

  public createFetcher(request: FetcherPostRequest): Observable<FetcherApiModel> {
    return this._http.post<FetcherApiModel>(`${this.apiUrl}/fetcher`, request);
  }

  public updateFetcher(fetcherId: string, request: FetcherPostRequest) {
    return this._http.put(`${this.apiUrl}/fetcher/${fetcherId}`, request);
  }

  public deleteFetcher(fetcherId: string) {
    return this._http.delete(`${this.apiUrl}/fetcher/${fetcherId}`);
  }

  public restartFetcher(fetcherId: string) {
    return this._http.post(`${this.apiUrl}/fetcher/${fetcherId}`, fetcherId);
  }
}
