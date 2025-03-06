import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierPraticienComponent } from './modifier-praticien.component';

describe('ModifierPraticienComponent', () => {
  let component: ModifierPraticienComponent;
  let fixture: ComponentFixture<ModifierPraticienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierPraticienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierPraticienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
