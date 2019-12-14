import { IPartnerAllocatedQuota } from 'app/shared/model/partner-allocated-quota.model';

export interface IPartnerOrder {
  id?: number;
  partnerId?: number;
  salesOrderId?: string;
  orderDate?: string;
  orders?: IPartnerAllocatedQuota[];
  partnerId?: number;
}

export class PartnerOrder implements IPartnerOrder {
  constructor(
    public id?: number,
    public partnerId?: number,
    public salesOrderId?: string,
    public orderDate?: string,
    public orders?: IPartnerAllocatedQuota[],
    public partnerId?: number
  ) {}
}
