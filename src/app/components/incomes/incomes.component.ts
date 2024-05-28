import { Component, inject, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { UntypedFormGroup } from '@angular/forms';
import { MaterialModule } from '../../shared/material-module';
@Component({
  selector: 'app-incomes',
  standalone: true,
  imports: [
    DatePipe,
    TitleCasePipe,
    MaterialModule
  ],
  templateUrl: './incomes.component.html',
  styleUrl: './incomes.component.scss',
})
export class IncomesComponent implements OnInit {
  paymentService = inject(PaymentService);
  payments: MatTableDataSource<any>;
  params = {
    page: 1,
    page_size: 12,
  };
  total: number;
  filters: UntypedFormGroup;
  displayedColumns: string[] = [
    'date',
    'publicacion',
    'type',
    'seller',
    'state',
    'amount',
  ];

  ngOnInit() {
    this.loadPayments();
  }

  loadPayments() {
    this.paymentService.getPayments().subscribe((payments: any) => {
      this.payments = new MatTableDataSource(payments.results);
      console.log(this.payments);
    });
  }

  /* paginate($event: PageEvent) {
    this.params.page = $event.pageIndex + 1;
    this.params.page_size = $event.pageSize;
    this.total = $event.length;
    this.load();
  } */
}
