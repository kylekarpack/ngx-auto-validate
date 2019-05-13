import { TestBed } from '@angular/core/testing';

import { NgxAutoValidateService } from './ngx-auto-validate.service';

describe('NgxAutoValidateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxAutoValidateService = TestBed.get(NgxAutoValidateService);
    expect(service).toBeTruthy();
  });
});
