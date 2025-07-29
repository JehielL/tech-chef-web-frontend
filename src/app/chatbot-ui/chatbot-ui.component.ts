import { AfterViewChecked, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatbot-ui',
  standalone: true,
  imports: [],
  templateUrl: './chatbot-ui.component.html',
  styleUrl: './chatbot-ui.component.css'
})
export class ChatbotUiComponent implements OnInit, AfterViewChecked {

  messages: { role: string, content: string }[] = [];
  apiKey: string = 'E5s6NcdrMKyVfnExcPg8nGXbXuv2ZV';
  maxMessagesToShow: number = 10;
  isLoading = false;
  displayedMessages: Set<string> = new Set();
  // TU TOKEN JWT COPIADO DEL CURL AQUÍ (entre comillas)
  jwtToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTRiNjIwNzQtNTg4MS00ZGIzLTlmYzAtNDJkNmRhNWU5NTYyIiwiZW1haWwiOiJwcnVlYmFAZWplbXBsby5jb20iLCJyb2xlIjoiYnJvbmNlIiwiZXhwIjoxNzU0MzEzNTgzfQ.F8dVtC5xgLHQK0B004mWAIYAHQWofAA3tdX-ubNFKsE';

  ngOnInit() {
    // Mensaje de bienvenida opcional
    this.messages.push({ role: 'system', content: '¡Hola! 😊 ¿En qué puedo ayudarte hoy?' });
  }

  displayMessages(messages: any[]) {
    const messagesToShow = messages.length >= this.maxMessagesToShow ? messages.slice(-this.maxMessagesToShow) : messages;
    messagesToShow.forEach(messageData => {
      if (!this.displayedMessages.has(messageData.content)) {
        this.messages.push({ role: messageData.role, content: messageData.content });
        this.displayedMessages.add(messageData.content);
      }
    });
  }

  closeChat() {
    const chatBot = document.getElementById('chat-bot');
    if (chatBot) {
      chatBot.style.display = 'none';
    }
  }

  async sendMessage(event: Event) {
    event.preventDefault();
    const messageInput = (document.getElementById('message-input') as HTMLInputElement).value;
    if (!messageInput) return;

    // Agrega el mensaje del usuario
    this.messages.push({ role: 'user', content: messageInput });
    this.displayedMessages.add(messageInput);

    // Loader
    this.isLoading = true;

    await this.sendMessageToChatbot(messageInput);

    (document.getElementById('message-input') as HTMLInputElement).value = '';
  }

  async sendMessageToChatbot(userMessage: string) {
  try {
    const token = this.jwtToken;

    const response = await fetch('http://192.168.1.55:5002/chat/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-contexto': 'robota-context.txt',
        'x-api-key': this.apiKey,
        'Authorization': `Bearer ${this.jwtToken}`
      },
      body: JSON.stringify({ message: userMessage }),
      credentials: 'include'
    });

    if (!response.ok) throw new Error('Error en la respuesta de la API');

    const data = await response.json();
    const botResponse = data.response;

    this.messages.push({ role: 'system', content: botResponse });
    this.displayedMessages.add(botResponse);

  } catch (error) {
    console.error('Error al enviar el mensaje al chatbot:', error);

    // Mensaje personalizado de fallback
    const fallbackMessage = `🤖 Nuestro chatbot está en desarrollo. Si necesitas asistencia inmediata, escríbenos por WhatsApp al 📱 *643 90 70 51*. ¡Estaremos encantados de ayudarte!`;

    this.messages.push({ role: 'system', content: fallbackMessage });
    this.displayedMessages.add(fallbackMessage);

  } finally {
    setTimeout(() => { this.isLoading = false; }, 2000);
  }
}



  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage(event);
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom() {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }

  toggleChat() {
    const chatBot = document.getElementById('chat-bot');
    if (chatBot) {
      chatBot.style.display = chatBot.style.display === 'none' || chatBot.style.display === '' ? 'block' : 'none';
    }
  }

  async resetChat() {
  try {
    const response = await fetch('http://192.168.1.55:5002/chat/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-contexto': 'robota-context.txt',
        'x-api-key': this.apiKey,
        'Authorization': `Bearer ${this.jwtToken}`
      },
      body: JSON.stringify({}),   // <--- Body vacío para forzar JSON
      credentials: 'include'
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error('Error en la respuesta de la API: ' + errorText);
    }

    this.messages = [];
    this.displayedMessages.clear();
    this.messages.push({ role: 'system', content: '¡Hola! 😊 ¿En qué puedo ayudarte hoy?' });

  } catch (error) {
    console.error('Error al resetear el chat:', error);
    this.messages.push({ role: 'system', content: '⚠️ Error al resetear el chat.' });
  }
}
  async resetChatWithConfirmation() {
    const confirmation = confirm('¿Estás seguro de que quieres reiniciar el chat? Esto borrará todo el historial.');
    if (confirmation) {
      await this.resetChat();
    }

}
}
