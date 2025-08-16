import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeConsentModalComponent } from './age-consent-modal.component';

describe('AgeConsentModalComponent', () => {
  let component: AgeConsentModalComponent;
  let fixture: ComponentFixture<AgeConsentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgeConsentModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgeConsentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
