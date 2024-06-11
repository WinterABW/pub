import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UtilesService } from './utiles.service';
import { map, Observable } from 'rxjs';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const URL = `${environment.baseUrl}/publicacion`;
const URLv2 = `${environment.baseUrlv2}/publicacion`;

@Injectable({
  providedIn: 'root',
})
export class PublicationService {
  private http = inject(HttpClient);
  private utils = inject(UtilesService);

  getAll(params?): Observable<any> {
    const queryParams = this.utils.getQueryParams(params);
    return this.http.get(`${URLv2}/`, {
      params: queryParams,
    });
  }

  deletePublication(id: number) {
    return this.http.delete(`${URL}/${id}/`);
  }

  update(id: number, publicacion: any) {
    const fd = new FormData();
    for (const field in publicacion) {
      if (publicacion[field] && field === 'release_date') {
        fd.append(
          'release_date',
          format(publicacion.release_date, "yyyy-MM-dd'T'HH:mm", { locale: es })
        );
      } else if (publicacion[field] && field === 'sale_start_date') {
        fd.append(
          'sale_start_date',
          format(publicacion.sale_start_date, "yyyy-MM-dd'T'HH:mm", {
            locale: es,
          })
        );
      } else {
        fd.append(
          field,
          Array.isArray(publicacion[field])
            ? publicacion[field].map((i) => (i.id ? i.id : i))
            : publicacion[field]
        );
      }
    }
    publicacion.precios &&
      fd.set('precios', JSON.stringify(publicacion.precios));

    return this.http.patch(`${URL}/${id}/`, fd);
  }

  stopLive(output: string) {
    const body = new FormData();
    body.append('action', 'end_live');
    body.append('minio_id', output);

    return this.http.post(`${URLv2}/proxy_nomad/`, body);
  }

  generarClave() {
    return this.http
      .get(`${URLv2}/generar_clave/`)
      .pipe(map((res: any) => res.clave));
  }
  
  create(publicacion, modelo) {
    const body = new FormData();
    body.append('nombre', publicacion.nombre);
    body.append('canal', publicacion.canal);
    body.append('descripcion', publicacion.descripcion);
    body.append('mostrar_comentarios', publicacion.mostrar_comentarios);
    publicacion.mostrar_chat &&
      body.append('mostrar_chat', publicacion.mostrar_chat);
    publicacion.url_manifiesto &&
      body.append('url_manifiesto', publicacion.url_manifiesto);
    body.append('url_imagen', publicacion.url_imagen);
    if (publicacion.tipo === 'live') {
      body.append('palabraClave', publicacion.palabraClave.toString());
      body.append('clave_emision', publicacion.clave_emision);
    } else {
      body.append('palabraClave', publicacion.palabras_claves.toString());
    }
    if (publicacion.tipo !== 'publicacion_en_vivo') {
      body.append('tipologia', publicacion.tipologia.toString());
    }
    publicacion.precios.length &&
      body.append('precios', JSON.stringify(publicacion.precios));
    body.append('tipo', publicacion.tipo);
    body.append('publicado', publicacion.publicado);
    body.append('internacional', publicacion.internacional);
    if (publicacion.url_subtitulo) {
      body.append('url_subtitulo', publicacion.url_subtitulo);
    }

    switch (modelo) {
      case 'eventotipologia': {
        body.append('evento', publicacion.evento);
        break;
      }
      case 'capitulo': {
        body.append('numero', publicacion.numero);
        body.append('temporada', publicacion.temporada.toString());
        break;
      }
      case 'reportaje': {
        body.append('autor', publicacion.autor);
        break;
      }
      case 'documental': {
        body.append(
          'productora',
          publicacion.productora.map((i) => i.id)
        );
        body.append('pais', publicacion.pais);
        break;
      }
      case 'audio': {
        publicacion.autor.length &&
          body.append(
            'autor',
            publicacion.autor.map((i) => i.id)
          );
        break;
      }
      case 'cancion': {
        body.append(
          'productor_ejecutivo',
          publicacion.productor_ejecutivo.map((i) => i.id)
        );
        body.append(
          'publisher',
          publicacion.publisher.map((i) => i.id)
        );
        body.append(
          'performer',
          publicacion.performer.map((i) => i.id)
        );
        body.append(
          'invitado',
          publicacion.invitado.map((i) => i.id)
        );
        body.append(
          'autor',
          publicacion.autor.map((i) => i.id)
        );

        body.append('isrc', publicacion.isrc);
        body.append('masterights', publicacion.masterights);
        body.append(
          'release_date',
          format(publicacion.release_date, "yyyy-MM-dd'T'HH:mm", { locale: es })
        );
        body.append(
          'sale_start_date',
          format(publicacion.sale_start_date, "yyyy-MM-dd'T'HH:mm", {
            locale: es,
          })
        );
        body.append('sello', publicacion.sello);
        body.append('pais_fonograma', publicacion.pais_fonograma);
        body.append('codigo_producto', publicacion.codigo_producto);
        body.append('numero_track', publicacion.numero_track);
        body.append('titulo_track', publicacion.titulo_track);

        break;
      }
      case 'videoclip': {
        body.append(
          'interprete',
          publicacion.interprete.map((i) => i.id)
        );
        publicacion.productor &&
          body.append(
            'productor',
            publicacion.productor.map((i) => i.id)
          );
        body.append('ano', publicacion.ano.toString());
        body.append(
          'director',
          publicacion.director.map((i) => i.id)
        );
        body.append(
          'director_fotografico',
          publicacion.director_fotografico.map((i) => i.id)
        );
        publicacion.director_arte &&
          body.append(
            'director_arte',
            publicacion.director_arte.map((i) => i.id)
          );
        publicacion.director_artistico &&
          body.append(
            'director_artistico',
            publicacion.director_artistico.map((i) => i.id)
          );
        body.append(
          'guionista',
          publicacion.guionista.map((i) => i.id)
        );
        body.append('genero', publicacion.genero);
        body.append('sello', publicacion.sello);
        body.append(
          'release_date',
          format(publicacion.release_date, "yyyy-MM-dd'T'HH:mm", { locale: es })
        );
        body.append(
          'sale_start_date',
          format(publicacion.sale_start_date, "yyyy-MM-dd'T'HH:mm", {
            locale: es,
          })
        );
        body.append('genero', publicacion.genero);
        break;
      }
      case 'curso': {
        body.append(
          'autor',
          publicacion.autor.map((i) => i.id)
        );
        body.append('temporada', publicacion.temporada.toString());
        break;
      }
      case 'pelicula': {
        body.append('pais', publicacion.pais);
        body.append(
          'director',
          publicacion.director.map((i) => i.id)
        );
        body.append('ano', publicacion.ano.toString());
        body.append(
          'productora',
          publicacion.productora.map((i) => i.id)
        );
        body.append('genero', publicacion.genero);
        body.append(
          'premio',
          publicacion.premio.map((i) => i.id)
        );
        body.append(
          'reparto',
          publicacion.reparto.map((i) => i.id)
        );
        body.append(
          'fotografia',
          publicacion.fotografia.map((i) => i.id)
        );
        body.append(
          'musica',
          publicacion.musica.map((i) => i.id)
        );
        body.append(
          'guion',
          publicacion.guion.map((i) => i.id)
        );
        body.append('imagen_secundaria', publicacion.imagen_secundaria);
        break;
      }
    }
    return this.http.post(`${URL}`, body);
  }
}
