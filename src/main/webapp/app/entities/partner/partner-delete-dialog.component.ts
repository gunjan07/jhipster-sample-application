import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPartner } from 'app/shared/model/partner.model';
import { PartnerService } from './partner.service';

@Component({
  templateUrl: './partner-delete-dialog.component.html'
})
export class PartnerDeleteDialogComponent {
  partner: IPartner;

  constructor(protected partnerService: PartnerService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.partnerService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'partnerListModification',
        content: 'Deleted an partner'
      });
      this.activeModal.dismiss(true);
    });
  }
}
