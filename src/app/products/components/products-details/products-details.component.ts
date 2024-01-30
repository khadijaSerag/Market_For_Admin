import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss'],
})
export class ProductsDetailsComponent implements OnInit {
  productSelectedDetails: any = {};
  loading: boolean = false;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id']; /// to take id from the url in link 
    this.productDetails(id);
  }

  productDetails(id: number) {
    this.loading = true;
    this.productsService.getSingleProduct(id).subscribe(
      (res: any) => {
        this.productSelectedDetails = res;
        this.loading = false;
        console.log(res);
      },
      (error) => {
        alert('there are this error : ' + error);
        this.loading = false;
      }
    );
  }
}
