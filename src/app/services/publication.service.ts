import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UtilesService } from './utiles.service';
import { Observable } from 'rxjs';

const baseUrl = environment.baseUrl;
const baseUrlv2 = environment.baseUrlv2;

const URL = `${environment.baseUrl}/publicacion`;
const URLv2 = `${environment.baseUrlv2}/publicacion`;

@Injectable({
  providedIn: 'root',
})
export class PublicationService {
  private http = inject(HttpClient);
  private utils = inject(UtilesService);

  getAll(params?):Observable<any> {
    const queryParams = this.utils.getQueryParams(params);
    return this.http.get(`${URLv2}/`, {
      params: queryParams,
    });
  }
}
