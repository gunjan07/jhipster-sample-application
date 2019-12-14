import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPartnerAllocatedQuota } from 'app/shared/model/partner-allocated-quota.model';

@Component({
  selector: 'jhi-partner-allocated-quota-detail',
  templateUrl: './partner-allocated-quota-detail.component.html'
})
export class PartnerAllocatedQuotaDetailComponent implements OnInit {
  partnerAllocatedQuota: IPartnerAllocatedQuota;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ partnerAllocatedQuota }) => {
      this.partnerAllocatedQuota = partnerAllocatedQuota;
    });
  }

  previousState() {
    window.history.back();
  }
}
