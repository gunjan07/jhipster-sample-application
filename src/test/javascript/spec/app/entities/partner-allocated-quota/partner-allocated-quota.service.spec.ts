import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { PartnerAllocatedQuotaService } from 'app/entities/partner-allocated-quota/partner-allocated-quota.service';
import { IPartnerAllocatedQuota, PartnerAllocatedQuota } from 'app/shared/model/partner-allocated-quota.model';

describe('Service Tests', () => {
  describe('PartnerAllocatedQuota Service', () => {
    let injector: TestBed;
    let service: PartnerAllocatedQuotaService;
    let httpMock: HttpTestingController;
    let elemDefault: IPartnerAllocatedQuota;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(PartnerAllocatedQuotaService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new PartnerAllocatedQuota(0, 0, 0, 0, currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            startDate: currentDate.format(DATE_FORMAT),
            expiryDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a PartnerAllocatedQuota', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            startDate: currentDate.format(DATE_FORMAT),
            expiryDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            startDate: currentDate,
            expiryDate: currentDate
          },
          returnedFromService
        );
        service
          .create(new PartnerAllocatedQuota(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a PartnerAllocatedQuota', () => {
        const returnedFromService = Object.assign(
          {
            partnerOrderId: 1,
            productId: 1,
            quantity: 1,
            startDate: currentDate.format(DATE_FORMAT),
            expiryDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            startDate: currentDate,
            expiryDate: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of PartnerAllocatedQuota', () => {
        const returnedFromService = Object.assign(
          {
            partnerOrderId: 1,
            productId: 1,
            quantity: 1,
            startDate: currentDate.format(DATE_FORMAT),
            expiryDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            startDate: currentDate,
            expiryDate: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a PartnerAllocatedQuota', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
