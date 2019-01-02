/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DialogServiceService } from './dialogService.service';

describe('Service: DialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogServiceService]
    });
  });

  it('should ...', inject([DialogServiceService], (service: DialogServiceService) => {
    expect(service).toBeTruthy();
  }));
});
