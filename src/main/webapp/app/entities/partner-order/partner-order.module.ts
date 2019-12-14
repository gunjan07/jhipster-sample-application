import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { PartnerOrderComponent } from './partner-order.component';
import { PartnerOrderDetailComponent } from './partner-order-detail.component';
import { PartnerOrderUpdateComponent } from './partner-order-update.component';
import { PartnerOrderDeleteDialogComponent } from './partner-order-delete-dialog.component';
import { partnerOrderRoute } from './partner-order.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(partnerOrderRoute)],
  declarations: [PartnerOrderComponent, PartnerOrderDetailComponent, PartnerOrderUpdateComponent, PartnerOrderDeleteDialogComponent],
  entryComponents: [PartnerOrderDeleteDialogComponent]
})
export class JhipsterSampleApplicationPartnerOrderModule {}
