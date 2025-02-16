import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'cart-modal',
  standalone: true,
  imports: [CartComponent],
  templateUrl: './cart-modal.component.html'
})
export class CartModalComponent {

    @Input() total: number = 0;
    @Input() items: CartItem[] = [];

    @Output() idProductEventEmitter = new EventEmitter<number>();
    @Output() closeEventEmitter = new EventEmitter();
    

    onDeleteCart(id: number) {
      this.idProductEventEmitter.emit(id);
    }

    closeCart(): void {  
      this.closeEventEmitter.emit();
    }
}
