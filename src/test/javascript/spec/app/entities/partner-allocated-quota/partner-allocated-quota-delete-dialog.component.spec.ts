import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { PartnerAllocatedQuotaDeleteDialogComponent } from 'app/entities/partner-allocated-quota/partner-allocated-quota-delete-dialog.component';
import { PartnerAllocatedQuotaService } from 'app/entities/partner-allocated-quota/partner-allocated-quota.service';

describe('Component Tests', () => {
  describe('PartnerAllocatedQuota Management Delete Component', () => {
    let comp: PartnerAllocatedQuotaDeleteDialogComponent;
    let fixture: ComponentFixture<PartnerAllocatedQuotaDeleteDialogComponent>;
    let service: PartnerAllocatedQuotaService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [PartnerAllocatedQuotaDeleteDialogComponent]
      })
        .overrideTemplate(PartnerAllocatedQuotaDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PartnerAllocatedQuotaDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PartnerAllocatedQuotaService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
