import {
  Component,
  inject,
  OnInit,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { debounceTime, distinctUntilChanged, shareReplay, tap } from 'rxjs';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { addDays, format, subMonths } from 'date-fns';

import { MaterialModule } from '../../shared/material-module';
import { PaymentService } from '../../services/payment.service';
import { Publicacion } from '../../models/publicacion';
import { PublicationService } from '../../services/publication.service';
export interface Payment {
  amount: string;
  date: Date;
  type: 'tr' | 'ez';
  seller: any;
  state: 'SUCCESS' | 'FAILED' | 'PENDING';
  publicacion: any;
}
@Component({
  selector: 'app-incomes',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, TitleCasePipe, MaterialModule],
  templateUrl: './incomes.component.html',
  styleUrl: './incomes.component.scss',
})
export class IncomesComponent implements OnInit, AfterViewInit {
  publicationList: any;
  total: number;
  private selectedPublication: Publicacion | null = null;
  paymentFilters: UntypedFormGroup;
  pubControl = new UntypedFormControl('');
  private fb = inject(UntypedFormBuilder);

  private paymentService = inject(PaymentService);
  publicationService = inject(PublicationService);

  displayedColumns: string[] = [
    'date',
    'publicacion',
    'type',
    'seller',
    'state',
    'amount',
  ];
  dataSource = new MatTableDataSource<Payment>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  

  ngOnInit(): void {
    this.createForm();
    this.loadPayments();
    this.loadPublicaciones('');
  }

  ngAfterViewInit() {
    /* this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator; */
  }

  private loadPayments() {
    const filters = this.paymentFilters.value;
    if (filters.date__gte) {
      filters.date__gte = format(filters.date__gte, 'yyyy-MM-dd');
    } else {
      delete filters.date__gte;
    }
    if (filters.date__lt) {
      filters.date__lt = format(addDays(filters.date__lt, 1), 'yyyy-MM-dd');
    } else {
      delete filters.date__lt;
    }
    if (!filters.item_external_id) {
      delete filters.item_external_id;
    }
    if (filters.type === 'all') {
      delete filters.type;
    }
    if (!filters.channel_id) {
      delete filters.channel_id;
    }
    if (this.selectedPublication) {
      const type_pub = this.paymentFilters.get('type_pub');
      if (type_pub) {
        this.paymentFilters.patchValue({
          item_external_id: `publicacion_${type_pub.value}_${this.selectedPublication?.id}`,
        });
      }
    } else {
      delete filters.external_id;
    }
    if (!filters.state) delete filters.state;

    delete filters.type_pub;
    this.paymentService
      .getPayments(filters)
      .pipe(
        tap((data: any) => {
          this.dataSource = data.results;
          this.total = data.count;
        })
      )
      .subscribe();
  }

  loadPublicaciones(term: string) {
    this.publicationService
      .getAll(
        term
          ? {
              nombre__wildcard: term + '*',
              precios__isnull: false,
            }
          : { precios__isnull: false }
      )
      .subscribe((res) => {
        this.publicationList = res.results;
      });
  }

  private createForm() {
    const endDate = new Date();
    const startDate = subMonths(endDate, 1);
    this.paymentFilters = this.fb.group({
      date__gte: [startDate],
      date__lt: [endDate],
      item_external_id: [],
      limit: [10],
      offset: [0],
      state: ['SUCCESS'],
      type_pub: ['reproduccion'],
      type: ['all'],
      channel_id: [''],
    });
    this.paymentFilters.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), shareReplay())
      .subscribe((value) => {
        this.loadPayments();
      });
    this.pubControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      shareReplay(),
      tap((x) => {
        this.loadPublicaciones(x);
      })
    );
  }

  selectPublication(publication: Publicacion) {
    if (publication) {
      this.selectedPublication = publication;
      const type_pub = this.paymentFilters.get('type_pub');
      if (type_pub) {
        this.paymentFilters.patchValue({
          item_external_id: `publicacion_${type_pub.value}_${publication?.id}`,
        });
      }
    } else {
      this.paymentFilters.patchValue({ external_id: `` });
    }
  }

  paginate({ pageIndex, pageSize, length }: PageEvent) {
    this.paymentFilters.patchValue({
      offset: pageIndex * pageSize,
      limit: pageSize,
    });
    this.total = length;
  }
}
