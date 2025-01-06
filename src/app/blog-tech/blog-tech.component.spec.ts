import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogTechComponent } from './blog-tech.component';

describe('BlogTechComponent', () => {
  let component: BlogTechComponent;
  let fixture: ComponentFixture<BlogTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogTechComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
