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
      this.chats = data.chats;
    });
  }

  onSearchChanged(searchText: string) {
    this.chatService.filterChats(searchText);
  }

  navigateToChatDetail(chatId: number) {
    this.router.navigate(['/chats', chatId]);
  }

}
