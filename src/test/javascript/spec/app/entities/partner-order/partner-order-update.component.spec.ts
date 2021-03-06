import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { PartnerOrderUpdateComponent } from 'app/entities/partner-order/partner-order-update.component';
import { PartnerOrderService } from 'app/entities/partner-order/partner-order.service';
import { PartnerOrder } from 'app/shared/model/partner-order.model';

describe('Component Tests', () => {
  describe('PartnerOrder Management Update Component', () => {
    let comp: PartnerOrderUpdateComponent;
    let fixture: ComponentFixture<PartnerOrderUpdateComponent>;
    let service: PartnerOrderService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [PartnerOrderUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PartnerOrderUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PartnerOrderUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PartnerOrderService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PartnerOrder(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new PartnerOrder();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
