import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/material-module';
import { formatDistanceToNow } from 'date-fns';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommentService } from '../services/comment.service';
import { finalize } from 'rxjs';
import { ConfirmDialogComponent } from '../../../shared/components/common/confirm-dialog/confirm-dialog.component';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})

export class CommentComponent implements OnInit {
  comments: any[] = [];
  commentForm: UntypedFormGroup;
  answerDialogRef: MatDialogRef<any>;
  private dialog = inject(MatDialog);
  loading: boolean;
  filters: UntypedFormGroup=null;
  total: any;
  comentarioService = inject(CommentService);
  private snackBar=inject(HotToastService)
  params = {
    page: 1,
    page_size: 12,
  };
  disableToggle = false;

  ngOnInit(): void {
    console.log('CommentComponent');
    
    this.load();
  }

  load() {
    this.loading = true;
    /*     const filters = this.filters.value;
if (filters.eliminado === 'all') delete filters.eliminado;
 */
    this.comentarioService
      .get_comentarios({
        /* params: { ...this.params, ...filters }, */
        params: {  },
        mapResponseFn: (response) => {
          this.total = response.count;
          return response.results;
        },
      })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((data: any) => {
        this.comments = data.results;
        console.log(this.comments);
      });
  }

  togglePublicado(id: any, event: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmación',
        msg: event.target.checked
          ? '¿Está seguro que desea publicar este comentario?'
          : '¿Está seguro que desea ocultar este comentario?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.disableToggle = true;
        this.comentarioService
          .togglePublicado(id, event.target.checked)
          .pipe(
            this.snackBar.observe({
              loading: 'Actualizando comentario',
              success: 'Comentario actualizado correctamente',
              error: 'No se puedo actualizar el comentario',
            })
          )
          .subscribe(
            () => {
              this.disableToggle = false;
              this.load();
            },
            () => {
              this.disableToggle = false;
            }
          );
      }
    });
  }
  
  formatRelativeDate(date: Date): string {
    return formatDistanceToNow(date, { addSuffix: true }); //, locale: es
  }
  eliminarComentario(element) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmación',
        msg: '¿Está seguro que desea eliminar este comentario?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.comentarioService
          .delete(element.id)
          .pipe(
            this.snackBar.observe({
              loading: 'Eliminando comentario',
              success: 'Comentario eliminado correctamente',
              error: 'No se puedo eliminar el comentario',
            })
          )
          .subscribe(() => {
            this.total -= 1;
            this.load();
          });
      }
    });
  }
}
