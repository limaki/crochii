import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnuncioDetalleComponent } from './anuncio-detalle.component';

describe('AnuncioDetalleComponent', () => {
  let component: AnuncioDetalleComponent;
  let fixture: ComponentFixture<AnuncioDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnuncioDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnuncioDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
