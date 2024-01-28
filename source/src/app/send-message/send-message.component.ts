import { Component, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})

export class SendMessageComponent {
  @Output() messageSent = new EventEmitter<{ content: string, contentType: 'text' | 'image', imagePath: SafeUrl }>();
  message: { content: string, contentType: 'text' | 'image', imagePath: SafeUrl } = { content: '', contentType: 'text', imagePath: '' };

  constructor(private sanitizer: DomSanitizer) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.message.contentType = 'image';

      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Use a relative path to the image in the app/assets folder
        const imageUrl = this.sanitizer.bypassSecurityTrustUrl('../../assets/signs/' + file.name) as SafeUrl;
        console.log(imageUrl)
        this.message.imagePath = imageUrl;
      };
      reader.readAsDataURL(file);

      this.message.content = '';  // Clear the text content when an image is selected
    }
  }

  sendMessage() {
    if (this.message.content.trim() !== '' || this.message.contentType === 'image') {
      this.messageSent.emit({ ...this.message });
      this.message = { content: '', contentType: 'text', imagePath: '' }; 
    }
  }
}

