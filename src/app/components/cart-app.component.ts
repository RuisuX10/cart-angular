import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { CatalogComponent } from './catalog/catalog.component';
import { CartComponent } from './cart/cart.component';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from "./navbar/navbar.component";
import { CartModalComponent } from './cart-modal/cart-modal.component';

@Component({
  selector: 'app-cart-app',
  standalone: true,
  imports: [CatalogComponent, NavbarComponent, CartModalComponent],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit{

  products: Product[] = [];
  items: CartItem[] = [];
  total: number = 0;
  showCart: boolean = false;

  constructor(private service: ProductService) {}
  ngOnInit(): void {
    this.products = this.service.findAll();
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    // this.calculateTotal();
  }

  addToCart(product: Product):void {
    const hasItem = this.items.find(item => item.product.id === product.id);
    if(hasItem) {
      this.items = this.items.map(item => {
        if(item.product.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1
          }
        }
        return item;
      })
    } else{
      this.items = [...this.items, { product: {...product}, quantity: 1 }];
    }
    // this.calculateTotal();
    // this.saveSession();
  }

  onDeleteCart(id: number) {
    this.items = this.items.filter(item => item.product.id !== id);
    if (this.items.length === 0) {
      sessionStorage.removeItem('cart');
      sessionStorage.clear();
    }
    // this.calculateTotal();
    // this.saveSession();
  }

  // calculateTotal(): void {
  //   this.total = this.items.reduce((acumulator, item) => acumulator + item.product.price * item.quantity, 0);
  // }

  // saveSession(): void {
  //   sessionStorage.setItem('cart', JSON.stringify(this.items));
  // }

  openCart(): void {
    this.showCart = !this.showCart;
  }
}
