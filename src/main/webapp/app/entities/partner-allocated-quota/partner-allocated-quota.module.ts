import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { PartnerAllocatedQuotaComponent } from './partner-allocated-quota.component';
import { PartnerAllocatedQuotaDetailComponent } from './partner-allocated-quota-detail.component';
import { PartnerAllocatedQuotaUpdateComponent } from './partner-allocated-quota-update.component';
import { PartnerAllocatedQuotaDeleteDialogComponent } from './partner-allocated-quota-delete-dialog.component';
import { partnerAllocatedQuotaRoute } from './partner-allocated-quota.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(partnerAllocatedQuotaRoute)],
  declarations: [
    PartnerAllocatedQuotaComponent,
    PartnerAllocatedQuotaDetailComponent,
    PartnerAllocatedQuotaUpdateComponent,
    PartnerAllocatedQuotaDeleteDialogComponent
  ],
  entryComponents: [PartnerAllocatedQuotaDeleteDialogComponent]
})
export class JhipsterSampleApplicationPartnerAllocatedQuotaModule {}
