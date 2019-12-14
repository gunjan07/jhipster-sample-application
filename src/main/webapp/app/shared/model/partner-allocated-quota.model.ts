import { Moment } from 'moment';

export interface IPartnerAllocatedQuota {
  id?: number;
  quantity?: number;
  startDate?: Moment;
  expiryDate?: Moment;
  status?: string;
  productDetailsId?: number;
  partnerOrderId?: number;
}

export class PartnerAllocatedQuota implements IPartnerAllocatedQuota {
  constructor(
    public id?: number,
    public quantity?: number,
    public startDate?: Moment,
    public expiryDate?: Moment,
    public status?: string,
    public productDetailsId?: number,
    public partnerOrderId?: number
  ) {}
}
