import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { PublicationService } from '../../../services/publication.service';

@Injectable({
  providedIn: 'root',
})
export class ClaveResolverService implements Resolve<any> {
  constructor(private publicationService: PublicationService) {}

  resolve(): Observable<any> | Promise<any> | any {
    return this.publicationService.generarClave();
  }
}
