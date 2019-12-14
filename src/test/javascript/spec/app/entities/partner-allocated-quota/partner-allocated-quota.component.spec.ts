import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { PartnerAllocatedQuotaComponent } from 'app/entities/partner-allocated-quota/partner-allocated-quota.component';
import { PartnerAllocatedQuotaService } from 'app/entities/partner-allocated-quota/partner-allocated-quota.service';
import { PartnerAllocatedQuota } from 'app/shared/model/partner-allocated-quota.model';

describe('Component Tests', () => {
  describe('PartnerAllocatedQuota Management Component', () => {
    let comp: PartnerAllocatedQuotaComponent;
    let fixture: ComponentFixture<PartnerAllocatedQuotaComponent>;
    let service: PartnerAllocatedQuotaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [PartnerAllocatedQuotaComponent],
        providers: []
      })
        .overrideTemplate(PartnerAllocatedQuotaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PartnerAllocatedQuotaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PartnerAllocatedQuotaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PartnerAllocatedQuota(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.partnerAllocatedQuotas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
