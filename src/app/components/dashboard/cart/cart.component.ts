import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../common/navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  public products: any = [];
  public grandTotal!: number;

  constructor(
    public cartService: CartService,
    private route: Router
  ){}

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.cartService.getProducts().subscribe((res) => {
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }

  removeProduct(product: any){
    this.cartService.removeCartItem(product);
  }

  removeAllProduct() {
    this.cartService.removeAllCart();
  }

}
