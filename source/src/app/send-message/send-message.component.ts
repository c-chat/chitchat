import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent {
  @Output() messageSent = new EventEmitter<string>();
  message: string = '';

  sendMessage() {
    if (this.message.trim() !== '') {
      console.log(this.message)
      this.messageSent.emit(this.message.trim());
      this.message = ''; 
    }
  }
}
