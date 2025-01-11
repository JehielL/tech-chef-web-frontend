import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDesarrolloComponent } from './blog-desarrollo.component';

describe('BlogDesarrolloComponent', () => {
  let component: BlogDesarrolloComponent;
  let fixture: ComponentFixture<BlogDesarrolloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogDesarrolloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogDesarrolloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
