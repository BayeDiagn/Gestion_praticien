import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterPraticienComponent } from './ajouter-praticien.component';

describe('AjouterPraticienComponent', () => {
  let component: AjouterPraticienComponent;
  let fixture: ComponentFixture<AjouterPraticienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterPraticienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterPraticienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
