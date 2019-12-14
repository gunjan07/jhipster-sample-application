import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { PartnerAllocatedQuotaUpdateComponent } from 'app/entities/partner-allocated-quota/partner-allocated-quota-update.component';
import { PartnerAllocatedQuotaService } from 'app/entities/partner-allocated-quota/partner-allocated-quota.service';
import { PartnerAllocatedQuota } from 'app/shared/model/partner-allocated-quota.model';

describe('Component Tests', () => {
  describe('PartnerAllocatedQuota Management Update Component', () => {
    let comp: PartnerAllocatedQuotaUpdateComponent;
    let fixture: ComponentFixture<PartnerAllocatedQuotaUpdateComponent>;
    let service: PartnerAllocatedQuotaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [PartnerAllocatedQuotaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PartnerAllocatedQuotaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PartnerAllocatedQuotaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PartnerAllocatedQuotaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PartnerAllocatedQuota(123);
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
        const entity = new PartnerAllocatedQuota();
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
