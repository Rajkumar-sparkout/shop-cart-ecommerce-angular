import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  public logoutTab = false;

  constructor(){}

  ngOnInit(): void {
    if(localStorage.getItem('email')){
      this.logoutTab = true;
    }
  }

  logout(){
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    window.location.href = window.location.href
  }

}
