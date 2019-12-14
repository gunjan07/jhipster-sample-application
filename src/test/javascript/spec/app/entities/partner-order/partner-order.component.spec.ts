import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { PartnerOrderComponent } from 'app/entities/partner-order/partner-order.component';
import { PartnerOrderService } from 'app/entities/partner-order/partner-order.service';
import { PartnerOrder } from 'app/shared/model/partner-order.model';

describe('Component Tests', () => {
  describe('PartnerOrder Management Component', () => {
    let comp: PartnerOrderComponent;
    let fixture: ComponentFixture<PartnerOrderComponent>;
    let service: PartnerOrderService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [PartnerOrderComponent],
        providers: []
      })
        .overrideTemplate(PartnerOrderComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PartnerOrderComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PartnerOrderService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PartnerOrder(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.partnerOrders[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
