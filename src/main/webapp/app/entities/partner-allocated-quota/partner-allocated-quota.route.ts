import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PartnerAllocatedQuota } from 'app/shared/model/partner-allocated-quota.model';
import { PartnerAllocatedQuotaService } from './partner-allocated-quota.service';
import { PartnerAllocatedQuotaComponent } from './partner-allocated-quota.component';
import { PartnerAllocatedQuotaDetailComponent } from './partner-allocated-quota-detail.component';
import { PartnerAllocatedQuotaUpdateComponent } from './partner-allocated-quota-update.component';
import { IPartnerAllocatedQuota } from 'app/shared/model/partner-allocated-quota.model';

@Injectable({ providedIn: 'root' })
export class PartnerAllocatedQuotaResolve implements Resolve<IPartnerAllocatedQuota> {
  constructor(private service: PartnerAllocatedQuotaService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPartnerAllocatedQuota> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((partnerAllocatedQuota: HttpResponse<PartnerAllocatedQuota>) => partnerAllocatedQuota.body));
    }
    return of(new PartnerAllocatedQuota());
  }
}

export const partnerAllocatedQuotaRoute: Routes = [
  {
    path: '',
    component: PartnerAllocatedQuotaComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.partnerAllocatedQuota.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PartnerAllocatedQuotaDetailComponent,
    resolve: {
      partnerAllocatedQuota: PartnerAllocatedQuotaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.partnerAllocatedQuota.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PartnerAllocatedQuotaUpdateComponent,
    resolve: {
      partnerAllocatedQuota: PartnerAllocatedQuotaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.partnerAllocatedQuota.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PartnerAllocatedQuotaUpdateComponent,
    resolve: {
      partnerAllocatedQuota: PartnerAllocatedQuotaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.partnerAllocatedQuota.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
