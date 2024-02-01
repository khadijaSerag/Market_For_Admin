import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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

  isFormDirty: boolean = false;
  initialFormValue: any;

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

  constructor(
    private productsService: ProductsService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getProducts();
    this.getCategories();

    // make update button in model disabled untill change the data
    // Set initial form value
    this.initialFormValue = this.editForm.value;
    // Subscribe to form value changes
    this.editForm.valueChanges.subscribe(() => {
      this.isFormDirty = !this.areFormValuesEqual(
        this.editForm.value,
        this.initialFormValue
      );
    });
  }

  // to check the equal of values with inputs
  private areFormValuesEqual(
    initialFormValue: any,
    changedFormValue: any
  ): boolean {
    // Implement your logic to compare form values
    return (
      JSON.stringify(initialFormValue) === JSON.stringify(changedFormValue)
    );
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

  onShowModal() {
    this.addForm.reset();
    this.base64 = null;
    // this.addForm.get('image')?.setValue(null)
  }

  onAddProduct() {
    console.log('form : ', this.addForm.value);
    const model = this.addForm.value;
    this.productsService.addNewProduct(model).subscribe((res: any) => {
      // when success execute these...
      $('#addProduct').modal('hide');
      this.toastr.success('This Product is added', 'Added Successfully');
      this.getProducts(); // to refresh the data
    });
    this.addForm.reset();
    this.addForm.get('image')?.setValue(null);
    this.addForm.get('category')?.setValue(null);
    // this.addForm.value.category ? '' : '';
    this.addForm.value.image = null;
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

    this.initialFormValue = this.editForm.value;
    this.isFormDirty = false;
  }

  onUpdateProduct(id: any, model: any) {
    let data = {
      title: model.value.title,
      price: model.value.price,
      category: model.value.category,
      image: model.value.image,
      description: model.value.description,
    };
    this.productsService.updateProduct(id, data).subscribe((res: any) => {
      $('#sureUpdateModal').modal('hide');
      $('#updateProduct').modal('hide');
      this.toastr.success('This Product is Updated', 'Updated Successfully');
    });
  }
}
