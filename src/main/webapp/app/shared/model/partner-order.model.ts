import { IPartnerAllocatedQuota } from 'app/shared/model/partner-allocated-quota.model';

export interface IPartnerOrder {
  id?: number;
  salesOrderId?: string;
  orderDate?: string;
  serviceNumber?: string;
  orders?: IPartnerAllocatedQuota[];
  partnerId?: number;
}

export class PartnerOrder implements IPartnerOrder {
  constructor(
    public id?: number,
    public salesOrderId?: string,
    public orderDate?: string,
    public serviceNumber?: string,
    public orders?: IPartnerAllocatedQuota[],
    public partnerId?: number
  ) {}
}
