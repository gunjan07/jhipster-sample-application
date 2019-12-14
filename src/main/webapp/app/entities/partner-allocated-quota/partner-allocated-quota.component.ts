import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPartnerAllocatedQuota } from 'app/shared/model/partner-allocated-quota.model';
import { PartnerAllocatedQuotaService } from './partner-allocated-quota.service';
import { PartnerAllocatedQuotaDeleteDialogComponent } from './partner-allocated-quota-delete-dialog.component';

@Component({
  selector: 'jhi-partner-allocated-quota',
  templateUrl: './partner-allocated-quota.component.html'
})
export class PartnerAllocatedQuotaComponent implements OnInit, OnDestroy {
  partnerAllocatedQuotas: IPartnerAllocatedQuota[];
  eventSubscriber: Subscription;

  constructor(
    protected partnerAllocatedQuotaService: PartnerAllocatedQuotaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll() {
    this.partnerAllocatedQuotaService.query().subscribe((res: HttpResponse<IPartnerAllocatedQuota[]>) => {
      this.partnerAllocatedQuotas = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInPartnerAllocatedQuotas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPartnerAllocatedQuota) {
    return item.id;
  }

  registerChangeInPartnerAllocatedQuotas() {
    this.eventSubscriber = this.eventManager.subscribe('partnerAllocatedQuotaListModification', () => this.loadAll());
  }

  delete(partnerAllocatedQuota: IPartnerAllocatedQuota) {
    const modalRef = this.modalService.open(PartnerAllocatedQuotaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.partnerAllocatedQuota = partnerAllocatedQuota;
  }
}
