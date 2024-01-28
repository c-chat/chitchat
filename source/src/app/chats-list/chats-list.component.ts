import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss']
})
export class ChatsListComponent implements OnInit {

  chats: any;

  constructor(public chatService: ChatService, private router: Router) {}

  ngOnInit(): void {
    this.chatService.chats$.subscribe((data) => {
      this.chats = data.chats.map((chat: any) => {
        const lastMessage = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].content : '';
        return {
          id: chat.id,
          user: chat.user,
          sign: chat.sign,
          lastMessage: lastMessage
        };
      });
    });
  }

  onSearchChanged(searchText: string) {
    this.chatService.filterChats(searchText);
  }

  navigateToChatDetail(chatId: number) {
    this.router.navigate(['/chats', chatId]);
  }

}
