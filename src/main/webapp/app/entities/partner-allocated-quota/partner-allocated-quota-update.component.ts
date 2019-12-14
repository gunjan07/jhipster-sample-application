import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IPartnerAllocatedQuota, PartnerAllocatedQuota } from 'app/shared/model/partner-allocated-quota.model';
import { PartnerAllocatedQuotaService } from './partner-allocated-quota.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product/product.service';
import { IPartnerOrder } from 'app/shared/model/partner-order.model';
import { PartnerOrderService } from 'app/entities/partner-order/partner-order.service';

@Component({
  selector: 'jhi-partner-allocated-quota-update',
  templateUrl: './partner-allocated-quota-update.component.html'
})
export class PartnerAllocatedQuotaUpdateComponent implements OnInit {
  isSaving: boolean;

  products: IProduct[];

  partnerorders: IPartnerOrder[];
  startDateDp: any;
  expiryDateDp: any;

  editForm = this.fb.group({
    id: [],
    partnerOrderId: [],
    productId: [],
    quantity: [],
    startDate: [],
    expiryDate: [],
    productDetailsId: [],
    partnerOrderId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected partnerAllocatedQuotaService: PartnerAllocatedQuotaService,
    protected productService: ProductService,
    protected partnerOrderService: PartnerOrderService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ partnerAllocatedQuota }) => {
      this.updateForm(partnerAllocatedQuota);
    });
    this.productService
      .query()
      .subscribe((res: HttpResponse<IProduct[]>) => (this.products = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.partnerOrderService
      .query()
      .subscribe(
        (res: HttpResponse<IPartnerOrder[]>) => (this.partnerorders = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(partnerAllocatedQuota: IPartnerAllocatedQuota) {
    this.editForm.patchValue({
      id: partnerAllocatedQuota.id,
      partnerOrderId: partnerAllocatedQuota.partnerOrderId,
      productId: partnerAllocatedQuota.productId,
      quantity: partnerAllocatedQuota.quantity,
      startDate: partnerAllocatedQuota.startDate,
      expiryDate: partnerAllocatedQuota.expiryDate,
      productDetailsId: partnerAllocatedQuota.productDetailsId,
      partnerOrderId: partnerAllocatedQuota.partnerOrderId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const partnerAllocatedQuota = this.createFromForm();
    if (partnerAllocatedQuota.id !== undefined) {
      this.subscribeToSaveResponse(this.partnerAllocatedQuotaService.update(partnerAllocatedQuota));
    } else {
      this.subscribeToSaveResponse(this.partnerAllocatedQuotaService.create(partnerAllocatedQuota));
    }
  }

  private createFromForm(): IPartnerAllocatedQuota {
    return {
      ...new PartnerAllocatedQuota(),
      id: this.editForm.get(['id']).value,
      partnerOrderId: this.editForm.get(['partnerOrderId']).value,
      productId: this.editForm.get(['productId']).value,
      quantity: this.editForm.get(['quantity']).value,
      startDate: this.editForm.get(['startDate']).value,
      expiryDate: this.editForm.get(['expiryDate']).value,
      productDetailsId: this.editForm.get(['productDetailsId']).value,
      partnerOrderId: this.editForm.get(['partnerOrderId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPartnerAllocatedQuota>>) {
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

  trackProductById(index: number, item: IProduct) {
    return item.id;
  }

  trackPartnerOrderById(index: number, item: IPartnerOrder) {
    return item.id;
  }
}
