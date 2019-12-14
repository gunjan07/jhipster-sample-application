import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { PartnerAllocatedQuotaDetailComponent } from 'app/entities/partner-allocated-quota/partner-allocated-quota-detail.component';
import { PartnerAllocatedQuota } from 'app/shared/model/partner-allocated-quota.model';

describe('Component Tests', () => {
  describe('PartnerAllocatedQuota Management Detail Component', () => {
    let comp: PartnerAllocatedQuotaDetailComponent;
    let fixture: ComponentFixture<PartnerAllocatedQuotaDetailComponent>;
    const route = ({ data: of({ partnerAllocatedQuota: new PartnerAllocatedQuota(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [PartnerAllocatedQuotaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PartnerAllocatedQuotaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PartnerAllocatedQuotaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.partnerAllocatedQuota).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
