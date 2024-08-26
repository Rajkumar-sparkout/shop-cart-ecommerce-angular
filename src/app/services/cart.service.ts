import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any = [];
  public productList = new BehaviorSubject<Product[]>([]);

  constructor() { }

  getProducts() {
    return this.productList.asObservable();
  }

  // setProduct(product: any) {
  //   this.cartItemList.push(...product);
  //   this.productList.next(product)
  // }

  addtoCart(product: Product) {
    const existingItem = this.cartItemList.findIndex((item: any) => item.id === product.id);

    if(existingItem > -1){
      this.cartItemList[existingItem].quantity += product.quantity;
      // this.cartItemList[existingItem].total = product.price + this.cartItemList[existingItem].price;
      this.cartItemList[existingItem].discountedPrice = this.calculateDiscountedPrice(product.price, product.offer);
      this.cartItemList[existingItem].total = this.calculateDiscountedPrice(product.price, product.offer) * this.cartItemList[existingItem].quantity;
    }else{
      product.discountedPrice = this.calculateDiscountedPrice(product.price, product.offer);
      product.total = this.calculateDiscountedPrice(product.price, product.offer);
      this.cartItemList.unshift(product);
    }
    this.productList.next([...this.cartItemList]);
    this.getTotalPrice();
  }

  // updateCartTotal() {
  //   const total = this.cartItemList.reduce((total: number, item: any) => 
  //     total + (item.price * item.quantity), 0);
  // }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total;
    });
    return grandTotal;
  }

  calculateDiscountedPrice(price: number, offer?: number): number {
    if (offer) {
      return price - (price * (offer / 100));
    }
    return price;
  }

  removeCartItem(product: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    });
    this.productList.next(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
