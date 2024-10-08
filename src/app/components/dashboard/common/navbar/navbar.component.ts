import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  // public logo = "../../../../../assets/images/shop-logo.jpg";
  public cart = false;
  public totalItem: number = 0;
  public userDropdown: boolean = false;
  public userRole: any;
  public email: any;


  constructor(
    private cartService: CartService,
    private router: Router,
  ){}

  ngOnInit(): void {
    if(localStorage.getItem('role') == 'User'){
      this.cart = true;
    }

    if(localStorage.getItem('role')){
      this.userRole =localStorage.getItem('role')
      this.email =localStorage.getItem('email')
    }

    this.cartService.getProducts().subscribe((res)=> {
      this.totalItem = res.length;
    })
  }

  gotoCart(){
    this.router.navigate(['cart'])
  }

  marginRight = "100"

  toggleDropdown(){
    this.userDropdown = !this.userDropdown;
  }

  logout(){
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    window.location.href = window.location.href
  }

}
