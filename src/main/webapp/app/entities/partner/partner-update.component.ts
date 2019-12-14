import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPartner, Partner } from 'app/shared/model/partner.model';
import { PartnerService } from './partner.service';

@Component({
  selector: 'jhi-partner-update',
  templateUrl: './partner-update.component.html'
})
export class PartnerUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    partnerName: [],
    partnerCode: []
  });

  constructor(protected partnerService: PartnerService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ partner }) => {
      this.updateForm(partner);
    });
  }

  updateForm(partner: IPartner) {
    this.editForm.patchValue({
      id: partner.id,
      partnerName: partner.partnerName,
      partnerCode: partner.partnerCode
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const partner = this.createFromForm();
    if (partner.id !== undefined) {
      this.subscribeToSaveResponse(this.partnerService.update(partner));
    } else {
      this.subscribeToSaveResponse(this.partnerService.create(partner));
    }
  }

  private createFromForm(): IPartner {
    return {
      ...new Partner(),
      id: this.editForm.get(['id']).value,
      partnerName: this.editForm.get(['partnerName']).value,
      partnerCode: this.editForm.get(['partnerCode']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPartner>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
