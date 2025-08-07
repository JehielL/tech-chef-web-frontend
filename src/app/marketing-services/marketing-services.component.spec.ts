import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingServicesComponent } from './marketing-services.component';

describe('MarketingServicesComponent', () => {
  let component: MarketingServicesComponent;
  let fixture: ComponentFixture<MarketingServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketingServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketingServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
