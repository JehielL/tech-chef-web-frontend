import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComercialServicesComponent } from './comercial-services.component';

describe('ComercialServicesComponent', () => {
  let component: ComercialServicesComponent;
  let fixture: ComponentFixture<ComercialServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComercialServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComercialServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
