import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogEmprendimientoComponent } from './blog-emprendimiento.component';

describe('BlogEmprendimientoComponent', () => {
  let component: BlogEmprendimientoComponent;
  let fixture: ComponentFixture<BlogEmprendimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogEmprendimientoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogEmprendimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
