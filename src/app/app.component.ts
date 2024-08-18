import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { PublicPageComponent } from './components/public-page/public-page.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, PublicPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'shop-carts';

  constructor(){}

  public userLogin = false;
  public userLogout = true;

  ngOnInit(): void {
    initFlowbite();
    
    if(localStorage.getItem('email')){
      this.userLogout = false;
      this.userLogin = true;
    }else{
      this.userLogout = true;
      this.userLogin = false;
    }

  }
}
