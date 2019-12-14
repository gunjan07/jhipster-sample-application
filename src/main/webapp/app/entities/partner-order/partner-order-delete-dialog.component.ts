import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPartnerOrder } from 'app/shared/model/partner-order.model';
import { PartnerOrderService } from './partner-order.service';

@Component({
  templateUrl: './partner-order-delete-dialog.component.html'
})
export class PartnerOrderDeleteDialogComponent {
  partnerOrder: IPartnerOrder;

  constructor(
    protected partnerOrderService: PartnerOrderService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.partnerOrderService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'partnerOrderListModification',
        content: 'Deleted an partnerOrder'
      });
      this.activeModal.dismiss(true);
    });
  }
}
