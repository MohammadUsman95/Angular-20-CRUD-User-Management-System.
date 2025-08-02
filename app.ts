import { UserStore } from './store/user-store';
import { User } from './types/user';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  formBuilder=inject(FormBuilder)
  userForm!:FormGroup;
  userStore : UserStore;
  selectedUser!:User | null;
  toaster= inject(ToastrService)
  constructor(){
    this.userForm = this.formBuilder.group({
      name: ['',Validators.required],
      email: ['',Validators.required],
      age: [],
      gender: [''],
    });
    this.userStore = new UserStore();
  }

  save(){
    if(this.userForm.invalid){
      this.toaster.error("Provide all required field")
      return;
    }
    let formValues = this.userForm.value;
    console.log(formValues);
    if(this.selectedUser){
      //update
      formValues.id = this.selectedUser.id
      this.userStore.updateUser(formValues);
    }else {
    this.userStore.addUser(formValues);
    }
    this.clearForm();
  }
  clearForm(){
    this.userForm.reset();
    this.selectedUser = null;

  }
  editUser(user:User){
    this.userForm.patchValue(user);
    this.selectedUser = user;
  }
  deleteUser(user:User){
    this.userStore.deleteUser(user);
  }
}
