import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { min } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  carts: any[] = [];

  cartProducts: any[] = [];
  total: number = 0;
  details: any;

  loading: boolean = false;
  error = '';
  nullData: boolean = false;
  filterDateForm!: FormGroup;

  constructor(
    private cartService: CartService,
    private productsService: ProductsService
  ) {}
  ngOnInit() {
    this.getAllCarts();

    this.filterDateForm = new FormGroup({
      startdate: new FormControl(null),
      enddate: new FormControl(null),
    });
  }

  applyFilter() {
    this.loading = true;
    let data = this.filterDateForm.value;
    this.getAllCarts(data);
  }

  getAllCarts(data?: any) {
    this.loading = true;
    this.cartService.getCarts(data).subscribe(
      (res: any) => {
        this.loading = false;
        if (res.length === 0) {
          this.nullData = true;
        } else {
          this.carts = res;
          this.nullData = false;
          console.log('carts', this.carts);
        }
      },
      (error) => {
        alert('there are Error.. ');
        this.error = error.message;
        this.loading = false;
      }
    );
  }

  deleteCart(index: number) {
    this.cartService.deleteCart(index).subscribe((res) => {
      alert('Cart deleted Success');
      this.getAllCarts();
      console.log('delete:: ', res);
    });
    // this.carts.splice(index, 1);
    // localStorage.setItem('cart', JSON.stringify(this.carts));
  }

  view(index: number) {
    this.cartProducts = [];
    this.details = this.carts[index];
    for (let i in this.details.products) {
      this.productsService
        .getSingleProduct(this.details.products[i].productId)
        .subscribe((res: any) => {
          this.cartProducts.push({
            item: res,
            quantity: this.details.products[i].quantity,
          });
          this.totalSalary();
        });
    }
  }

  totalSalary() {
    this.total = 0;
    for (let x in this.cartProducts) {
      this.total +=
        this.cartProducts[x].item.price * this.cartProducts[x].quantity;
    }
  }
}
