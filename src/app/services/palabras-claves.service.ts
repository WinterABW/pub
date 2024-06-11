import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, pluck } from 'rxjs/operators';
import { UtilesService } from './utiles.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const URL = `${environment.baseUrl}/palabra_clave/`
const URLv2 = `${environment.baseUrlv2}/palabra_clave/`

@Injectable({
  providedIn: 'root'
})
export class PalabrasClavesService {

  constructor(
    private httpCLient: HttpClient,
    private utilesService: UtilesService
  ) {
  }

  getAll() {
    return this.httpCLient.get(URL).pipe(map((response: any) => response.results));

  }

  getByQuery(params?): Observable<any> {
    let queryParameters = new HttpParams();
    if (params) {
      queryParameters = this.utilesService.getQueryParams(params);
    }

    return this.httpCLient.get(`${URLv2}`, {
      params: queryParameters
    }).pipe(pluck('results'));
  }

  create(palabra: string) {
    const body = new FormData();
    body.append('palabra', palabra);
    return this.httpCLient.post(URL, body)
  }
}
