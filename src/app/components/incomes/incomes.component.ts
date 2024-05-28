import {
  Component,
  inject,
  OnInit,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { PaymentService } from '../../services/payment.service';
import { DatePipe, TitleCasePipe } from '@angular/common';
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
  imports: [
    MatTableModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    DatePipe,
    TitleCasePipe,
  ],
  templateUrl: './incomes.component.html',
  styleUrl: './incomes.component.scss',
})
export class IncomesComponent implements OnInit, AfterViewInit {
  private paymentService = inject(PaymentService);
  private _liveAnnouncer = inject(LiveAnnouncer);
  dataSource = new MatTableDataSource<Payment>();

  displayedColumns: string[] = [
    'date',
    'publicacion',
    'type',
    'seller',
    'state',
    'amount',
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    console.log('object');
    /* this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator; */
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  ngOnInit(): void {
    this.paymentService.getPayments().subscribe((res: any) => {
      this.dataSource = res.results;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
}
