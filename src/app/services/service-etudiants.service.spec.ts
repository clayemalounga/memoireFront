import { TestBed } from '@angular/core/testing';

import { ServiceEtudiantsService } from './service-etudiants.service';

describe('ServiceEtudiantsService', () => {
  let service: ServiceEtudiantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceEtudiantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
