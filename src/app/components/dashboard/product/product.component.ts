import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../common/navbar/navbar.component';
import { ProductService } from '../../../services/product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../../../pipes/filter.pipe';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { RatingComponent } from '../rating/rating.component';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FormsModule, ReactiveFormsModule, FilterPipe, NgxSliderModule, RatingComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  public isDropdownOpen: boolean = false;
  public isFilterDropdownOpen: boolean = false;
  public listOfProducts: any;
  public searchKey!: string;
  public minValue: number = 0;
  public maxValue: number = 100000;
  public options: any = {
    floor: 0,
    ceil: 100000,
    step: 1,
    translate: (value: number): string => {
      return '$' + value;
    }
  };
  public product: any;
  public rating!: number;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
  ){
    
  }

  ngOnInit(): void {
    this.getAllProducts(); 
    this.filterProducts();  
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe(response=> {
      this.listOfProducts = response;

      this.listOfProducts.forEach((a: any) => {
        Object.assign(a, {quantity: 1, total: a.price, discountedPrice: 0})
      });
    },error=> {
      console.log(error);
    })
  }

  updateRating(newRating: number, id: string){ 
    this.productService.getProductById(id).subscribe({
      next: (res: any)=> {
        this.product = res;
        this.product[0].rating = newRating;        
        this.productService.updateProductById(id, this.product[0]).subscribe(); 
      },
      error: (err: HttpErrorResponse)=> {
        console.log(err);
      }
    })
  }

  getProductByCategory(category: any){
    this.productService.getProductByCategory(category).subscribe(res=> {
      this.listOfProducts = res;
    }, error=> {
      console.log(error);  
    })
  }

  addToCart(product: any){
    this.cartService.addtoCart(product)
  }

  filterProducts() {
    this.listOfProducts = this.listOfProducts.filter((product: any) =>
       product.price >= this.minValue && product.price <= this.maxValue
    );
  }

  sortMinPrice() {
    this.listOfProducts.sort(function (a: any, b: any) {
      return a.price - b.price;
    });
  }

  sortMaxPrice() {
    this.listOfProducts.sort(function (a: any, b: any) {
      return b.price - a.price;
    });
  }

  sortRating() {
    this.listOfProducts.sort(function (a: any, b: any) {
      return b.rating - a.rating;
    });
  }

  toggleDropdown(){
    this.isDropdownOpen = !this.isDropdownOpen;
    this.isFilterDropdownOpen = false
  }

  filterDropdown(){
    this.isFilterDropdownOpen = !this.isFilterDropdownOpen;
    this.isDropdownOpen = false
  }

}
