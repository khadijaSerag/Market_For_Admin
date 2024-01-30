import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartsRoutingModule } from './carts-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [
        CartComponent
    ],
    imports: [
        CommonModule,
        CartsRoutingModule,
        SharedModule,    
    ]
})
export class CartsModule { }
