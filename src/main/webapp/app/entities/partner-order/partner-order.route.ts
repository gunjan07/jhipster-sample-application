import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PartnerOrder } from 'app/shared/model/partner-order.model';
import { PartnerOrderService } from './partner-order.service';
import { PartnerOrderComponent } from './partner-order.component';
import { PartnerOrderDetailComponent } from './partner-order-detail.component';
import { PartnerOrderUpdateComponent } from './partner-order-update.component';
import { IPartnerOrder } from 'app/shared/model/partner-order.model';

@Injectable({ providedIn: 'root' })
export class PartnerOrderResolve implements Resolve<IPartnerOrder> {
  constructor(private service: PartnerOrderService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPartnerOrder> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((partnerOrder: HttpResponse<PartnerOrder>) => partnerOrder.body));
    }
    return of(new PartnerOrder());
  }
}

export const partnerOrderRoute: Routes = [
  {
    path: '',
    component: PartnerOrderComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.partnerOrder.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PartnerOrderDetailComponent,
    resolve: {
      partnerOrder: PartnerOrderResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.partnerOrder.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PartnerOrderUpdateComponent,
    resolve: {
      partnerOrder: PartnerOrderResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.partnerOrder.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PartnerOrderUpdateComponent,
    resolve: {
      partnerOrder: PartnerOrderResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.partnerOrder.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
