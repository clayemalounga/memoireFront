import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailHistoriquePaiementComponent } from './detail-historique-paiement.component';

describe('DetailHistoriquePaiementComponent', () => {
  let component: DetailHistoriquePaiementComponent;
  let fixture: ComponentFixture<DetailHistoriquePaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailHistoriquePaiementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailHistoriquePaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
