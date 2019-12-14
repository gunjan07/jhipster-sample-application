import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPartner } from 'app/shared/model/partner.model';
import { PartnerService } from './partner.service';
import { PartnerDeleteDialogComponent } from './partner-delete-dialog.component';

@Component({
  selector: 'jhi-partner',
  templateUrl: './partner.component.html'
})
export class PartnerComponent implements OnInit, OnDestroy {
  partners: IPartner[];
  eventSubscriber: Subscription;

  constructor(protected partnerService: PartnerService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.partnerService.query().subscribe((res: HttpResponse<IPartner[]>) => {
      this.partners = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInPartners();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPartner) {
    return item.id;
  }

  registerChangeInPartners() {
    this.eventSubscriber = this.eventManager.subscribe('partnerListModification', () => this.loadAll());
  }

  delete(partner: IPartner) {
    const modalRef = this.modalService.open(PartnerDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.partner = partner;
  }
}
