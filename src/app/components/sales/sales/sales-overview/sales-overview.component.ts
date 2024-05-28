import { Component, inject} from "@angular/core";

import { MaterialModule } from "../../../../shared/material-module"; 
import { PaymentService } from "../../../../services/payment.service";


@Component({
  selector: "app-sales-overview",
  standalone: true,
  imports: [MaterialModule],
  templateUrl: "./sales-overview.component.html"
})
export class SalesOverviewComponent{
  private paymentService=inject(PaymentService)
  

  
  
}
