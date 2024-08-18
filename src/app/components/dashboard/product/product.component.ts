import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../common/navbar/navbar.component';
import { ProductService } from '../../../services/product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../../../pipes/filter.pipe';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FormsModule, ReactiveFormsModule, FilterPipe, NgxSliderModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  public isDropdownOpen: boolean = false;
  public isFilterDropdownOpen: boolean = false;
  public listOfProducts: any = [];
  public filteredProducts: any = [];
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
        Object.assign(a, {quantity: 1, total: a.price})
      });
    },error=> {
      console.log(error);
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

  toggleDropdown(){
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  filterDropdown(){
    this.isFilterDropdownOpen = !this.isFilterDropdownOpen;
  }

}
