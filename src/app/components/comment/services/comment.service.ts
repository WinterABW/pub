import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { UtilesService } from '../../../services/utiles.service';

const URL = `${environment.baseUrl}/comentario`;
const URLv2 = `${environment.baseUrlv2}/comentario/`;

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private httpClient = inject(HttpClient);
  private utils = inject(UtilesService);

  get_comentarios(params) {
    let queryParams;
    if (params) {
      queryParams = this.utils.getQueryParams(params);
      console.log(queryParams);
    }
    return this.httpClient.get(`${URLv2}`, {
      params: queryParams,
    });
  }

  delete(id: any) {
    return this.httpClient.delete(`${URL}/${id}/`);
  }

  togglePublicado(id: number, status: boolean) {
    const body = new FormData();
    body.append('publicado', status.toString());
    return this.httpClient.patch(`${URL}/${id}/`, body);
  }

  addRespuesta(comment) {
    const respuesta = this.utils.getBody(comment);
    return this.httpClient.post(`${URL}/`, respuesta);
  }
}
