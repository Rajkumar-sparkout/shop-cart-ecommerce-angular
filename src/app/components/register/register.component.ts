import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../interfaces/common';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, PopupComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  public roles: string[] = ['Admin', 'User'];
  public color = '';
  public passwordCheck = true;
  public formFieldErrorMessage = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ){}

  ngOnInit(): void {
    
  }

  register = new FormGroup({
    name : new FormControl("", Validators.required),
    email : new FormControl("", [Validators.required, Validators.email]),
    role : new FormControl("", Validators.required),
    password : new FormControl("", [
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
      Validators.required
    ]),
    confirmPassword : new FormControl("", Validators.required),
  });

  get registerFormControl() {
    return this.register.controls;
  }

  get email() {
    return this.register.get('email');
  }

  get mobileNumber() {
    return this.register.get('mobileNumber');
  }

  get passwordFormField() {
    return this.register.get('password');
  }


  checkConfirmPassword(){
    const password = this.register.value.password as string;
    const confirmPassword = this.register.value.confirmPassword as string;
    if(password.length === confirmPassword.length && 
      password === confirmPassword){
        this.color = 'black';
        this.passwordCheck = true;
    }else{
      this.color = 'red';
      this.passwordCheck = false;
    }
  }

  gotoLogin(){
    this.router.navigate(['login'])
  }

  public message: string = '';
  public messageType: 'success' | 'error' = 'success';
  onSubmit(){
    if(this.register.valid){
      if(this.passwordCheck){
        const user = {...JSON.parse(JSON.stringify(this.register.value))}
        delete user.confirmPassword
        const email = user.email 

        // this.authService.getUserByEmail(email as string).subscribe(
        //   response=> {
        //     const email = response[0].email
        //     console.log(email);
            
        //     if(email == null){
              this.authService.createUser(user as User).subscribe( 
                data=>{
                  if(data){
                    console.log(data);
                    this.message = 'User registration is success';
                    this.messageType = 'success';
                    setTimeout(()=> {
                      this.router.navigate(['/login']);
                    }, 1000);
                  }
                },
                error=> {
                  console.log(error);
                  this.message = 'Registration failed';
                  this.messageType = 'error';
                } 
              )
            // }
            // else{
            //   this.message = 'Already registered with this email';
            //   this.messageType = 'error';
            //   setTimeout(()=> {
            //     window.location.href = window.location.href
            //   },1000)
            // }
          // },
          // error=> {
          //   console.log(error);
          //   this.message = 'Registration failed';
          //   this.messageType = 'error';
          // }
        // )
      }
    } 
  }


}
