/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DireccionServiceService } from './direccionService.service';

describe('Service: DireccionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DireccionServiceService]
    });
  });

  it('should ...', inject([DireccionServiceService], (service: DireccionServiceService) => {
    expect(service).toBeTruthy();
  }));
});
