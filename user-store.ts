import { ToastrService } from 'ngx-toastr';
import { Api } from './../services/api';
import { User } from './../types/user';
import { inject, signal } from '@angular/core';

export class UserStore {
  users = signal<User[]>([]);
  toaster = inject(ToastrService);
  api = inject(Api);
  constructor() {
    this.loadUser();
  }
  loadUser() {
    this.api.getUsers().subscribe((users) => {
      this.users.set(users);
    });
  }
  addUser(user: User) {
    //user.id = (this.users().length + 1).toString();
    this.api.addUser(user).subscribe((result: User) => {
      console.log(result);
      this.users.update((users) => {
        user.id = result.id;
        return [...users, user];
      });
      this.toaster.success("User Added.")
    });
    // this.users.update((users) => {
    //   return [...users, user];
    //});
  }
  updateUser(user: User) {
    this.api.updateUser(user).subscribe((result) => {
      this.users.update((users) => {
        return users.map((u) => {
          if (u.id === user.id) {
            return user;
          }
          return u;
        });
      });
            this.toaster.success("User Updated.")
    });
  }
  deleteUser(user: User) {
    this.api.deleteUser(user).subscribe(() => {
      this.users.update((users) => {
        return users.filter((u) => u.id != user.id);
      });
            this.toaster.success("User Deleted.")

    });
  }
}
