import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementEtudiantComponent } from './paiement-etudiant.component';

describe('PaiementEtudiantComponent', () => {
  let component: PaiementEtudiantComponent;
  let fixture: ComponentFixture<PaiementEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaiementEtudiantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaiementEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
