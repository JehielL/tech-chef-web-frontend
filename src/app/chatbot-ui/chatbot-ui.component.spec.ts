import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotUiComponent } from './chatbot-ui.component';

describe('ChatbotUiComponent', () => {
  let component: ChatbotUiComponent;
  let fixture: ComponentFixture<ChatbotUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatbotUiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatbotUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
