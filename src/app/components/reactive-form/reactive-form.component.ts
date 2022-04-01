import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Users } from 'src/app/class/users/users';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent implements OnInit {
  userList: Users[] = [
    {
      id: 1,
      name: 'Nicolás',
      lastName: 'Smael',
      username: 'userNico',
      email: 'nico.smael@gmail.com',
    },
  ];
  userForm!: FormGroup;

  constructor(public uf: FormBuilder) {
    this.userForm = this.uf.group({
      name: new FormControl('', [
        Validators.required,
        this.noWhitespaceValidator,
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      lastName: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          this.noWhitespaceValidator,
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.pattern('[a-zA-Z ]*'),
        ])
      ),
      username: new FormControl('', [
        Validators.required,
        this.noWhitespaceValidator,
        Validators.minLength(3),
        Validators.maxLength(15),
      ]),
      password: new FormControl('', [
        Validators.required,
        this.noWhitespaceValidator,
        Validators.minLength(5),
        Validators.maxLength(15),
      ]),
      email: new FormControl('', [
        Validators.required,
        this.noWhitespaceValidator,
        Validators.email,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
      ]),
    });
  }

  ngOnInit(): void {}

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  saveUser() {
    this.userList.push(this.userForm.value);
    this.userForm.reset();
  }
}
