import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  error = '';
  loading = false;
  // sending = false;
  cartProducts: any[] = [];
  base64: any = '';

  addForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    category: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
  });

  editForm = new FormGroup({
    id: new FormControl(null),
    title: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    category: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
  });

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.loading = true;
    this.productsService.getAllProducts().subscribe(
      (res: any) => {
        this.products = res;
        this.loading = false;
      },
      (error) => {
        alert('there are Error.. ');
        this.error = error.message;
        this.loading = false;
      }
    );
  }

  getCategories() {
    this.loading = true;
    this.productsService.getAllCategories().subscribe((res: any) => {
      this.categories = res;
      this.loading = false;
    });
  }

  getImagePath(event: any) {
    // console.log(event.target.files[0]);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result;
      this.addForm.get('image')?.setValue(this.base64);
    };
  }

  getSelectedCategory(event: any) {
    this.addForm.get('category')?.setValue(event.target.value);
  }

  onAddProduct() {
    console.log('form : ', this.addForm.value);
    // this.addForm.reset();
    const model = this.addForm.value;
    this.productsService.addNewProduct(model).subscribe((res: any) => {
      // when success execute these...
      $('#addProduct').modal('hide');
      alert('Add Product Success'); //  put toastr instead of alert
      this.getProducts(); // to refresh the data
      this.addForm.reset();
    });
  }

  update(event: any) {
    console.log(event);
    this.editForm.patchValue({
      id: event.id,
      title: event.title,
      price: event.price,
      category: event.category,
      image: event.image,
      description: event.description,
    });
    this.base64 = event.image;
  }

  onUpdateProduct(id: any, model: any) {
    let data = {
      title: model.value.title,
      price: model.value.price,
      category: model.value.category,
      image: model.value.image,
      description: model.value.description,
    };
    console.log('data', data);
    console.log('id', id);
    console.log('model', model);
    this.productsService.updateProduct(id, data).subscribe((res: any) => {
      console.log(res);
    });
  }
}
