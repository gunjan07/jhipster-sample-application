import { Moment } from 'moment';

export interface IPartnerAllocatedQuota {
  id?: number;
  partnerOrderId?: number;
  productId?: number;
  quantity?: number;
  startDate?: Moment;
  expiryDate?: Moment;
  productDetailsId?: number;
  partnerOrderId?: number;
}

export class PartnerAllocatedQuota implements IPartnerAllocatedQuota {
  constructor(
    public id?: number,
    public partnerOrderId?: number,
    public productId?: number,
    public quantity?: number,
    public startDate?: Moment,
    public expiryDate?: Moment,
    public productDetailsId?: number,
    public partnerOrderId?: number
  ) {}
}
