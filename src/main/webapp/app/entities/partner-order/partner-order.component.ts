import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPartnerOrder } from 'app/shared/model/partner-order.model';
import { PartnerOrderService } from './partner-order.service';
import { PartnerOrderDeleteDialogComponent } from './partner-order-delete-dialog.component';

@Component({
  selector: 'jhi-partner-order',
  templateUrl: './partner-order.component.html'
})
export class PartnerOrderComponent implements OnInit, OnDestroy {
  partnerOrders: IPartnerOrder[];
  eventSubscriber: Subscription;

  constructor(
    protected partnerOrderService: PartnerOrderService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll() {
    this.partnerOrderService.query().subscribe((res: HttpResponse<IPartnerOrder[]>) => {
      this.partnerOrders = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInPartnerOrders();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPartnerOrder) {
    return item.id;
  }

  registerChangeInPartnerOrders() {
    this.eventSubscriber = this.eventManager.subscribe('partnerOrderListModification', () => this.loadAll());
  }

  delete(partnerOrder: IPartnerOrder) {
    const modalRef = this.modalService.open(PartnerOrderDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.partnerOrder = partnerOrder;
  }
}
