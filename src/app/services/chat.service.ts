import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {configuration} from "../model/configuration.model";
import {Chat} from "../model/chat.model";
import {User} from "../model/user.model";
import {ChatRequest} from "../model/post/chat-request.model";
import {ContactChat} from "../model/contact-chat.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private configuration = configuration;

  constructor(private http: HttpClient) { }

  getChats(toUserId : number): Observable<Array<Chat>> {
    const url = configuration.host + '/api/chats/' + toUserId;
    return this.http.get<Array<Chat>>(url, httpOptions);
  }

  getChatContact(): Observable<Array<User>> {
    const url = configuration.host + '/api/chats';
    return this.http.get<Array<User>>(url);
  }

  getChatContacts(): Observable<Array<ContactChat>> {
    const url = configuration.host + '/api/chats';
    return this.http.get<Array<ContactChat>>(url);
  }

  addChat(chatRequest: ChatRequest): Observable<number> {
    const url = configuration.host + '/api/chat/addChat';
    return this.http.post<number>(url, chatRequest, httpOptions);
  }
}
