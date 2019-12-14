import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPartnerAllocatedQuota } from 'app/shared/model/partner-allocated-quota.model';
import { PartnerAllocatedQuotaService } from './partner-allocated-quota.service';

@Component({
  templateUrl: './partner-allocated-quota-delete-dialog.component.html'
})
export class PartnerAllocatedQuotaDeleteDialogComponent {
  partnerAllocatedQuota: IPartnerAllocatedQuota;

  constructor(
    protected partnerAllocatedQuotaService: PartnerAllocatedQuotaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.partnerAllocatedQuotaService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'partnerAllocatedQuotaListModification',
        content: 'Deleted an partnerAllocatedQuota'
      });
      this.activeModal.dismiss(true);
    });
  }
}
