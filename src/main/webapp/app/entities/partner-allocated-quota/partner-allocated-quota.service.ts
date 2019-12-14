import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPartnerAllocatedQuota } from 'app/shared/model/partner-allocated-quota.model';

type EntityResponseType = HttpResponse<IPartnerAllocatedQuota>;
type EntityArrayResponseType = HttpResponse<IPartnerAllocatedQuota[]>;

@Injectable({ providedIn: 'root' })
export class PartnerAllocatedQuotaService {
  public resourceUrl = SERVER_API_URL + 'api/partner-allocated-quotas';

  constructor(protected http: HttpClient) {}

  create(partnerAllocatedQuota: IPartnerAllocatedQuota): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(partnerAllocatedQuota);
    return this.http
      .post<IPartnerAllocatedQuota>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(partnerAllocatedQuota: IPartnerAllocatedQuota): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(partnerAllocatedQuota);
    return this.http
      .put<IPartnerAllocatedQuota>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPartnerAllocatedQuota>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPartnerAllocatedQuota[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(partnerAllocatedQuota: IPartnerAllocatedQuota): IPartnerAllocatedQuota {
    const copy: IPartnerAllocatedQuota = Object.assign({}, partnerAllocatedQuota, {
      startDate:
        partnerAllocatedQuota.startDate != null && partnerAllocatedQuota.startDate.isValid()
          ? partnerAllocatedQuota.startDate.format(DATE_FORMAT)
          : null,
      expiryDate:
        partnerAllocatedQuota.expiryDate != null && partnerAllocatedQuota.expiryDate.isValid()
          ? partnerAllocatedQuota.expiryDate.format(DATE_FORMAT)
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
      res.body.expiryDate = res.body.expiryDate != null ? moment(res.body.expiryDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((partnerAllocatedQuota: IPartnerAllocatedQuota) => {
        partnerAllocatedQuota.startDate = partnerAllocatedQuota.startDate != null ? moment(partnerAllocatedQuota.startDate) : null;
        partnerAllocatedQuota.expiryDate = partnerAllocatedQuota.expiryDate != null ? moment(partnerAllocatedQuota.expiryDate) : null;
      });
    }
    return res;
  }
}
