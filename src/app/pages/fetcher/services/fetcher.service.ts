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

  public deleteMultipleFetchers(fetcherIds: string[]) {
    return this._http.post(`${this.apiUrl}/fetcher:delete`, { ids: fetcherIds });
  }

  public restartFetcher(fetcherId: string) {
    return this._http.post(`${this.apiUrl}/fetcher/${fetcherId}`, fetcherId);
  }

  public activateFetcher(fetcherIds: string[]) {
    return this._http.post(`${this.apiUrl}/fetcher:activate`, { ids: fetcherIds });
  }

  public deactivateeFetcher(fetcherIds: string[]) {
    return this._http.post(`${this.apiUrl}/fetcher:deactivate`, { ids: fetcherIds });
  }

  public retrieveFetcherschedules(): Observable<Fetcherschedule[]> {
    return this._http.get<Fetcherschedule[]>(this.apiUrl + '/fetcherschedule');
  }

  public getFetcherschedule(fetcherId: string): Observable<Fetcherschedule> {
    return this._http.get<Fetcherschedule>(`${this.apiUrl}/fetcherschedule/${fetcherId}`);
  }

  public createFetcherschedule(request: any): Observable<Fetcherschedule> {
    return this._http.post<Fetcherschedule>(`${this.apiUrl}/fetcherschedule`, request);
  }

  public putFetcherschedule(fetcherId: string, request: any) {
    return this._http.put(`${this.apiUrl}/fetcherschedule/${fetcherId}`, request);
  }

  public deleteFetcherschedule(fetcherId: string) {
    return this._http.delete(`${this.apiUrl}/fetcherschedule/${fetcherId}`);
  }
}

export interface Fetcherschedule {
  fetcher_id: number,
  downtime_days: number[],
  downtime_start: string,
  downtime_end: string,
  id?: number
}
