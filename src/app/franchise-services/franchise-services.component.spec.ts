import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseServicesComponent } from './franchise-services.component';

describe('FranchiseServicesComponent', () => {
  let component: FranchiseServicesComponent;
  let fixture: ComponentFixture<FranchiseServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FranchiseServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FranchiseServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
