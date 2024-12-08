import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterEtudiantsComponent } from './ajouter-etudiants.component';

describe('AjouterEtudiantsComponent', () => {
  let component: AjouterEtudiantsComponent;
  let fixture: ComponentFixture<AjouterEtudiantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjouterEtudiantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjouterEtudiantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
