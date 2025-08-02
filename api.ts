import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class Api {
  baseUrl = "http://localhost:3000";
  http = inject(HttpClient);

  getUsers() {
    return this.http.get<User[]>(this.baseUrl + '/users');
  }
  addUser(user: User) {
    return this.http.post<User>(this.baseUrl + '/users', user);
  }
  updateUser(user: User) {
    return this.http.put(this.baseUrl + '/users/' + user.id, user);
  }
  deleteUser(user: User) {
    return this.http.delete(this.baseUrl + '/users/' + user.id);
  }
}
