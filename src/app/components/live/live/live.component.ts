import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, finalize, shareReplay } from 'rxjs/operators';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LiveBottomsheetComponent } from '../live-bottomsheet/live-bottomsheet.component';
import { HotToastService } from '@ngneat/hot-toast';
import { MaterialModule } from '../../../shared/material-module';
import { Live } from '../../../models/live';
import { PublicationService } from '../../../services/publication.service';
import { AuthService } from '../../../services/auth.service';
import { ConfirmDialogComponent } from '../../../shared/components/common/confirm-dialog/confirm-dialog.component';
import { PictaResponse } from '../../../models/response.picta.model';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss'],
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule,DatePipe,CommonModule,RouterLink]
})
export class LiveComponent implements OnInit {
  user: any;
  isLoggin = true;
  isAuth = true;
  isMobile: boolean;
  lives: Live[];

  displayedColumns: string[] = ['portada', 'nombre', 'visibility', 'fecha_publicado', 'operations'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  params = {
    page: 1,
    page_size: 10,
    nombre__wildcard: '',
    tipo: 'live'
  };

  total: number;
  filterControl = new UntypedFormControl('');
  loading = true;

  constructor(
    private publicationService: PublicationService,
    public authService: AuthService,
    private snackBar: MatSnackBar,
    private toast: HotToastService,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((res: any) => {
      if (res) {
        this.user = res;
        this.isLoggin = this.authService.isLoggedIn();
      } else {
        this.authService.getUserData().subscribe(
          (response: any) => {
            this.authService.setUserData(response);
          }
        );
      }
    });

    this.loadData();
    this.listenFilterControl();
  }

  edit(row: any) {
  }

  delete({ id }) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmación',
        msg: '¿Está seguro que desea eliminar esta directa?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.publicationService.deletePublication(id)
          .pipe(
            this.toast.observe({
              loading: 'Eliminando directa',
              success: 'Directa eliminada correctamente',
              error: 'No se pudo eliminar la publicación'

            }))
          .subscribe(
            () => {
              this.loadData();
            },
            () => this.snackBar.open('No se pudo eliminar la directa.')
          );
      }
    });
  }

  paginate($event: PageEvent) {
    this.params.page = $event.pageIndex + 1;
    this.params.page_size = $event.pageSize;
    this.loadData();
  }

  publicar(live: Live) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmación',
        msg: `¿Está seguro que desea ${!live.publicado ? 'publicar' : 'ocultar'
          } esta directa?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.publicationService.update(live.id, { publicado: !live.publicado, tipo: live.tipo })
          .pipe(
            this.toast.observe({
              loading: 'Actualizando directa',
              success: 'Directa actualizada correctamente',
              error: `No se pudo ${live.publicado ? 'publicar' : 'despublicar'} la directa.`

            }))
          .subscribe(() => {
            this.loadData();

          });


      }
    });
  }

  private listenFilterControl() {
    this.filterControl.valueChanges.pipe(
      debounceTime(400),
      shareReplay()
    ).subscribe(value => {
      this.params.nombre__wildcard = `*${value}*`;
      this.loadData();
    });
  }

  loadData() {
    this.loading = true;
    this.publicationService.getAll(this.params)
      .pipe(finalize(() => this.loading = false))
      .subscribe((data: PictaResponse<Live>) => {
        this.lives = data.results;
        this.paginator.length = data.count;
        this.total = data.count;
        console.log(this.lives)
      });
  }

  openBottomSheet(live: Live) {
    const ref = this.bottomSheet.open(LiveBottomsheetComponent, {
      data: {
        live
      }
    });
    ref.afterDismissed().subscribe(result => {
      if (result === 'delete') {
        this.delete(live);
      }
      if (result === 'toggle-visibility') {
        this.publicar(live);
      }
      if (result === 'stop-live') {
        this.stopLive(live);
      }
    });
  }

  stopLive({ url_manifiesto }) {
    const minioID = this.getLiveMinioID(url_manifiesto);
    this.publicationService.stopLive(minioID).subscribe(() => {
      this.toast.show('Directa detenida');
    }, error => {
      this.toast.error('No se pudo detener la directa');
    });
  }

  getLiveMinioID(urlManifiesto) {
    const texts = urlManifiesto.split('/');
    return texts[texts.length - 1].split('.')[0];
  }

  get permissions() {
    return this.user.groups.filter(group => group.name !== 'Usuario común').reduce((accumulator, currentValue) => accumulator.concat(currentValue.permissions), []);
  }

  public hasPermission(permission: string) {
    return this.permissions.findIndex(permiso => permiso.codename === permission) >= 0;
  }

  acortarTexto(texto: string, longitudMaxima: number): string {
    if (texto.length > longitudMaxima) {
      return texto.substr(0, longitudMaxima) + '...'; // Agrega puntos suspensivos al final
    } else {
      return texto;
    }
  }
  
}
