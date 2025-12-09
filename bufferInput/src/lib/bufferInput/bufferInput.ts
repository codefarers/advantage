import { Component, signal } from '@angular/core';
import { Validators, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { bufferCount, Subject, tap } from 'rxjs';
import { OnInit } from '@angular/core';

@Component({
  selector: 'lib-buffer-input',
  imports: [ReactiveFormsModule],
  templateUrl: './bufferInput.html',
})

export class BufferInput implements OnInit {
  private failedAttempts$ = new Subject<void>();
  outputMessage = 'Enter your credentials to login';
  failedAttempts = ''

  ngOnInit(): void {
    this.failedAttempts$.pipe(
      bufferCount(3),
      tap(() => {
        this.loginForm.get('userPassword')?.disable();
        this.failedAttempts = "Too many failed attempts, try again later!"
      })
    ).subscribe()
  }

  loginForm = new FormGroup({
    userPassword: new FormControl('', { validators: [Validators.required, Validators.minLength(6)] })
  })

  submitLoginForm() {

    if (this.loginForm.valid) {
      if (this.loginForm.value.userPassword === "password") {
        this.outputMessage = 'successfully logged in';
      } else {
        this.failedAttempts$.next();
        this.outputMessage = "Invalid credentials!"
      }
    } else {
      this.outputMessage = 'form invalid'
    }

  }
}
