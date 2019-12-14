import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IPartnerOrder, PartnerOrder } from 'app/shared/model/partner-order.model';
import { PartnerOrderService } from './partner-order.service';
import { IPartner } from 'app/shared/model/partner.model';
import { PartnerService } from 'app/entities/partner/partner.service';

@Component({
  selector: 'jhi-partner-order-update',
  templateUrl: './partner-order-update.component.html'
})
export class PartnerOrderUpdateComponent implements OnInit {
  isSaving: boolean;

  partners: IPartner[];

  editForm = this.fb.group({
    id: [],
    salesOrderId: [],
    orderDate: [],
    serviceNumber: [],
    partnerId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected partnerOrderService: PartnerOrderService,
    protected partnerService: PartnerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ partnerOrder }) => {
      this.updateForm(partnerOrder);
    });
    this.partnerService
      .query()
      .subscribe((res: HttpResponse<IPartner[]>) => (this.partners = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(partnerOrder: IPartnerOrder) {
    this.editForm.patchValue({
      id: partnerOrder.id,
      salesOrderId: partnerOrder.salesOrderId,
      orderDate: partnerOrder.orderDate,
      serviceNumber: partnerOrder.serviceNumber,
      partnerId: partnerOrder.partnerId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const partnerOrder = this.createFromForm();
    if (partnerOrder.id !== undefined) {
      this.subscribeToSaveResponse(this.partnerOrderService.update(partnerOrder));
    } else {
      this.subscribeToSaveResponse(this.partnerOrderService.create(partnerOrder));
    }
  }

  private createFromForm(): IPartnerOrder {
    return {
      ...new PartnerOrder(),
      id: this.editForm.get(['id']).value,
      salesOrderId: this.editForm.get(['salesOrderId']).value,
      orderDate: this.editForm.get(['orderDate']).value,
      serviceNumber: this.editForm.get(['serviceNumber']).value,
      partnerId: this.editForm.get(['partnerId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPartnerOrder>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackPartnerById(index: number, item: IPartner) {
    return item.id;
  }
}
