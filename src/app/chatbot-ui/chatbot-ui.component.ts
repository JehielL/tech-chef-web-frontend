import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ClienteData } from '../interfaces/cliente.model';

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
  clienteData: ClienteData = {
    nombreCliente: '',
    telefono: '',
    correoElectronico: '',
    motivoVisita: '',
    fechaRegistro: new Date().toISOString()
  };
  isLoading = false;

  currentStep: number = 0; 
  isCollectingData: boolean = true;
  historyLoaded: boolean = false;
  isRegistrationComplete: boolean = false; 
  hasStartedChatbot: boolean = false; 
  lastQuestionAsked: string = ''; 
  displayedMessages: Set<string> = new Set(); 

  ngOnInit() {
    
    this.askQuestion();
  }

  

  displayMessages(messages: any[]) {
    const messagesToShow = messages.length >= this.maxMessagesToShow ? messages.slice(-this.maxMessagesToShow) : messages;

    messagesToShow.forEach(messageData => {
      if (!this.displayedMessages.has(messageData.content)) {
        this.messages.push({ role: messageData.role, content: messageData.content });
        this.displayedMessages.add(messageData.content); // Marca este mensaje como mostrado
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
  
    // Evitar agregar el mismo mensaje repetido
    if (this.messages.length > 0 && this.messages[this.messages.length - 1].content === messageInput) {
      return;
    }
  
    if (!this.displayedMessages.has(messageInput)) {
      this.messages.push({ role: 'user', content: messageInput });
      this.displayedMessages.add(messageInput); // Marca el mensaje como mostrado
    }
  
    if (this.isCollectingData) {
      this.saveChatData(messageInput);
      this.currentStep++;
  
      if (this.isChatComplete()) {
        this.isCollectingData = false;
        this.isRegistrationComplete = true;
        await this.submitData();
        
        if (!this.hasStartedChatbot) {
          const confirmationMessage = 'Gracias, hemos registrado tu información. ¡Ahora podemos continuar con la conversación!';
          this.messages.push({ role: 'system', content: confirmationMessage });
          this.displayedMessages.add(confirmationMessage); // Marca el mensaje de confirmación como mostrado
          this.hasStartedChatbot = true;
        }
  
        await this.startChatbotInteraction();
      } else {
        this.askQuestion();
      }
    } else {
      // Activa el loader antes de enviar el mensaje al chatbot
      this.isLoading = true;
      await this.sendMessageToChatbot(messageInput);
    }
  
    (document.getElementById('message-input') as HTMLInputElement).value = '';
  }
  
  async sendMessageToChatbot(userMessage: string) {
    try {
      const response = await fetch('https://futurachatbot.com/app2/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "x-contexto": "futura-context",
          'x-api-key': this.apiKey
        },
        body: JSON.stringify({ message: userMessage }),
        credentials: 'include'
      });
  
      if (!response.ok) throw new Error('Error en la respuesta de la API');
    
      const data = await response.json();
      const chatbotMessages = data.history.slice(1); // Excluye el primer mensaje de la respuesta
  
      chatbotMessages.forEach((messageData: { role: string, content: string }) => {
        if (!this.displayedMessages.has(messageData.content)) {
          this.messages.push({ role: messageData.role, content: messageData.content });
          this.displayedMessages.add(messageData.content); // Marca el mensaje como mostrado
        }
      });
    } catch (error) {
      console.error('Error al enviar el mensaje al chatbot:', error);
    } finally {
      // Desactiva el loader después de recibir la respuesta
      setTimeout(() => { this.isLoading = false; }, 2000);
    }
  }
  
  startChatbotInteraction() {
    throw new Error('Method not implemented.');
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
      const response = await fetch('https://futurachatbot.com/app2/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "x-contexto": "futura-context",
          'x-api-key': this.apiKey
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }

      this.messages = [];
      this.currentStep = 0;
      this.isCollectingData = true;
      this.isRegistrationComplete = false;
      this.historyLoaded = false;
      this.displayedMessages.clear(); // Limpiar los mensajes mostrados

      this.clienteData = {
        nombreCliente: '',
        telefono: '',
        correoElectronico: '',
        motivoVisita: '',
        fechaRegistro: new Date().toISOString()
      };

      this.askQuestion();
    } catch (error) {
      console.error('Error al resetear el chat:', error);
    }
  }

  saveChatData(response: string) {  
    switch (this.currentStep) {
      case 0:
        this.clienteData.nombreCliente = response;
        break;
      case 1:
        this.clienteData.telefono = response;
        break;
      case 2:
        this.clienteData.correoElectronico = response;
        break;
      case 3:
        this.clienteData.motivoVisita = response;
        break;
      default:
        break;
    }
  }

  askQuestion() {
    let question = '';
    switch (this.currentStep) {
      case 0:
        question = '¿Bienvenido a Bite Software, en que puedo ayudarte hoy?';
        break;
      case 1:
        question = '¿Podrías indicar tu número de teléfono?';
        break;
      case 2:
        question = '¿Cuál es tu correo electrónico?';
        break;
      case 3:
        question = '¿Motivo de tu visita?';
        break;
      default:
        question = 'Gracias por la información. ¡Podemos Continuar con la conversación!';
    }
    this.lastQuestionAsked = question;
    if (!this.displayedMessages.has(question)) {
      this.messages.push({ role: 'system', content: question });
      this.displayedMessages.add(question); // Marca la pregunta como mostrada
    }
  }

  isChatComplete(): boolean {
    return this.clienteData.nombreCliente !== '' && this.clienteData.telefono !== '' && this.clienteData.correoElectronico !== '' && this.clienteData.motivoVisita !== '';
  }

  async submitData() {
    try {
      const response = await fetch('http://213.165.74.6:9090/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.clienteData)
      });

      if (!response.ok) {
        throw new Error('Error al enviar los datos al servidor');
      }

      // Mostrar mensaje de éxito después de guardar los datos
      const successMessage = '¡Datos guardados exitosamente! Gracias por registrar tu información.';
      if (!this.displayedMessages.has(successMessage)) {
        this.messages.push({ role: 'system', content: successMessage });
        this.displayedMessages.add(successMessage); // Marca el mensaje de éxito como mostrado
      }

    } catch (error) {
      console.error('Error al registrar los datos:', error);
    }
  }

}
