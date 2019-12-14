import { IPartnerOrder } from 'app/shared/model/partner-order.model';

export interface IPartner {
  id?: number;
  partnerName?: string;
  partnerCode?: string;
  partnerOrders?: IPartnerOrder[];
}

export class Partner implements IPartner {
  constructor(public id?: number, public partnerName?: string, public partnerCode?: string, public partnerOrders?: IPartnerOrder[]) {}
}
