import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPartnerOrder } from 'app/shared/model/partner-order.model';

@Component({
  selector: 'jhi-partner-order-detail',
  templateUrl: './partner-order-detail.component.html'
})
export class PartnerOrderDetailComponent implements OnInit {
  partnerOrder: IPartnerOrder;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ partnerOrder }) => {
      this.partnerOrder = partnerOrder;
    });
  }

  previousState() {
    window.history.back();
  }
}
