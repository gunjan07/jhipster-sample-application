import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { PartnerOrderDetailComponent } from 'app/entities/partner-order/partner-order-detail.component';
import { PartnerOrder } from 'app/shared/model/partner-order.model';

describe('Component Tests', () => {
  describe('PartnerOrder Management Detail Component', () => {
    let comp: PartnerOrderDetailComponent;
    let fixture: ComponentFixture<PartnerOrderDetailComponent>;
    const route = ({ data: of({ partnerOrder: new PartnerOrder(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [PartnerOrderDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PartnerOrderDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PartnerOrderDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.partnerOrder).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
