import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificacionBeneficiosComponent } from './verificacion-beneficios.component';

describe('VerificacionBeneficiosComponent', () => {
  let component: VerificacionBeneficiosComponent;
  let fixture: ComponentFixture<VerificacionBeneficiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificacionBeneficiosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificacionBeneficiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
