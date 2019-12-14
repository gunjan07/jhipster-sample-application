import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { PartnerComponent } from './partner.component';
import { PartnerDetailComponent } from './partner-detail.component';
import { PartnerUpdateComponent } from './partner-update.component';
import { PartnerDeleteDialogComponent } from './partner-delete-dialog.component';
import { partnerRoute } from './partner.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(partnerRoute)],
  declarations: [PartnerComponent, PartnerDetailComponent, PartnerUpdateComponent, PartnerDeleteDialogComponent],
  entryComponents: [PartnerDeleteDialogComponent]
})
export class JhipsterSampleApplicationPartnerModule {}
