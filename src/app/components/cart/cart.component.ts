import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent {
  @Input() total: number = 0;

  @Input() items: CartItem[] = [];

  @Output() idProductEventEmitter = new EventEmitter<number>();

  onDeleteCart(id: number) {
    this.idProductEventEmitter.emit(id);
  }

}
