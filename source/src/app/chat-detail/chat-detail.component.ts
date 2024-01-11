import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss']
})
export class ChatDetailComponent implements OnInit{

  chatId!: number;
  chatData: any = { user: {}, messages: [] };

  constructor (private route: ActivatedRoute, private router: Router, private chatService: ChatService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const chatId = +params['id'];
      if (!isNaN(chatId)) { 
        this.fetchChatData(chatId);
      } else {
        console.error('Invalid chat ID');
      }
    });
  }

  fetchChatData(chatId: number): void {
    this.chatService.getChatById(chatId).subscribe(
      (data: any) => {
        this.chatData = data;
      },
      (error: any) => {
        console.error(error);
        this.chatData = { user: {}, messages: [] }; 
      }
    );
  }

  goBack(): void {
    // Navigate back to the chat list page
    this.router.navigate(['/chats']);
  }

}
