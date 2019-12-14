import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.JhipsterSampleApplicationProductModule)
      },
      {
        path: 'partner',
        loadChildren: () => import('./partner/partner.module').then(m => m.JhipsterSampleApplicationPartnerModule)
      },
      {
        path: 'partner-order',
        loadChildren: () => import('./partner-order/partner-order.module').then(m => m.JhipsterSampleApplicationPartnerOrderModule)
      },
      {
        path: 'partner-allocated-quota',
        loadChildren: () =>
          import('./partner-allocated-quota/partner-allocated-quota.module').then(
            m => m.JhipsterSampleApplicationPartnerAllocatedQuotaModule
          )
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class JhipsterSampleApplicationEntityModule {}
