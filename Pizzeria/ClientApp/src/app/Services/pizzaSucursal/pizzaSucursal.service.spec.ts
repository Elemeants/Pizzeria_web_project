/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PizzaSucursalService } from './pizzaSucursal.service';

describe('Service: PizzaSucursal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PizzaSucursalService]
    });
  });

  it('should ...', inject([PizzaSucursalService], (service: PizzaSucursalService) => {
    expect(service).toBeTruthy();
  }));
});
