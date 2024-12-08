import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEtudiantsNonPayeLeMoisComponent } from './liste-etudiants-non-paye-le-mois.component';

describe('ListeEtudiantsNonPayeLeMoisComponent', () => {
  let component: ListeEtudiantsNonPayeLeMoisComponent;
  let fixture: ComponentFixture<ListeEtudiantsNonPayeLeMoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeEtudiantsNonPayeLeMoisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeEtudiantsNonPayeLeMoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
