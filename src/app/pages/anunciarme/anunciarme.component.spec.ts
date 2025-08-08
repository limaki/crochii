import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnunciarmeComponent } from './anunciarme.component';

describe('AnunciarmeComponent', () => {
  let component: AnunciarmeComponent;
  let fixture: ComponentFixture<AnunciarmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnunciarmeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnunciarmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
