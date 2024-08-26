import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, PopupComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  public message: string = '';
  public messageType: 'success' | 'error' = 'success';

  constructor(
    private authService: AuthService,
    private router: Router,
  ){}

  ngOnInit(): void {
    if(localStorage.getItem('email')){
      this.router.navigate(['dashboard']);
    }
  }

  loginForm = new FormGroup({
    email : new FormControl("", Validators.required),
    password : new FormControl("", Validators.required),
  });

  get loginFormControl() {
    return this.loginForm.controls;
  }

  gotoRegister(){
    this.router.navigate(['register'])
  }

  login(){
    const {email, password} = this.loginForm.value
    this.authService.getUserByEmail(email as string).subscribe(
      response=> {
        if(response.length > 0 && response[0].password === password){
          const role = response[0].role
          
          localStorage.setItem('email', email as string);
          localStorage.setItem('role', role);

          this.message = 'Login successfull';
          this.messageType = 'success';
          setTimeout(()=> {
            window.location.href = window.location.href
          }, 1000);
        }else{
          this.message = 'Username or password is wrong';
          this.messageType = 'error';
        }
      },
      error=> {
        console.log(error);
        this.message = 'Login failed';
        this.messageType = 'error';
      }
    )
  }


}
