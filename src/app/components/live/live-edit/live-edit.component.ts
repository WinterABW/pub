import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Publicacion } from '../../../models/publicacion';
import { Live } from '../../../models/live';
import { PublicationService } from '../../../services/publication.service';
import { LiveFormComponent } from '../live-form/live-form.component';

@Component({
  selector: 'app-live-edit',
  templateUrl: './live-edit.component.html',
  styleUrls: ['./live-edit.component.scss'],
  standalone: true,
  imports: [LiveFormComponent],
})
export class LiveEditComponent implements OnInit {
  @Input('id') id!: string;
  publicacion: Publicacion;
  live: Live;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private publicationService: PublicationService,
    private snackBar: MatSnackBar
  ) {
    this.live = this.route.snapshot.data['publicacion'];
  }

  ngOnInit(): void {
    //    this.buildLiveFromPublication();

  }

  save(live: any) {
    this.publicationService.update(this.live.id, live).subscribe((response) => {
      this.snackBar.open('Directa actualizada correctamente');
      this.router.navigateByUrl('/live');
    });
  }

  private buildLiveFromPublication() {
    this.live = this.publicacion.live;
  }
}
