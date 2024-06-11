import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MaterialModule } from '../../../shared/material-module';
import { PublicationService } from '../../../services/publication.service';
import { LiveFormComponent } from '../live-form/live-form.component';

@Component({
  selector: 'app-live-new',
  templateUrl: './live-new.component.html',
  styleUrls: ['./live-new.component.scss'],
  standalone: true,
  imports: [MaterialModule,LiveFormComponent]
})
export class LiveNewComponent implements OnInit {
  clave;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private publicationService: PublicationService,
    private snackBar: MatSnackBar,
  ) {
    this.clave = this.route.snapshot.data['clave'];
  }

  ngOnInit(): void {
  }

  save(live: any) {
    this.publicationService.create(live, 'live').subscribe(response => {
      this.snackBar.open('Directa creada correctamente');
      this.router.navigateByUrl('/live');
    });
  }
}
