import {  Component, OnInit,  EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ProductService} from '../services/product.service'



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Output() closeModal: EventEmitter<void> = new EventEmitter();
  @Output() productCreated: EventEmitter<void> = new EventEmitter<void>();


  modalForm!: FormGroup;
  submitted = false;
  errorMessage: string = '';
  successMessage: string = '';
  

  constructor(private formBuilder: FormBuilder,
    private ProductService: ProductService
    ) { }

    ngOnInit() {
      this.modalForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        price: ['', [Validators.required]],
        quantity: ['', [Validators.required]]
      });
    }

    get f() {
      return this.modalForm.controls;
    }

    onSubmit(){ 
      this.submitted = true;
      this.errorMessage = '';
  
      if (this.modalForm.invalid) {
        return;
      }

      console.log(this.modalForm.value)

      const product = { 
        name: this.modalForm.value.name,
        price: this.modalForm.value.price,
        quantity: this.modalForm.value.quantity,
      }

      this.ProductService.addProduct(product).subscribe(
        (response) => { 
          console.log(response)
          this.productCreated.emit();
          this.errorMessage = '';
          this.closeModal.emit();
        },
        (error) => {
          if (error.status === 401) {
            this.errorMessage = 'Unauthorized: Please check your credentials.';
          } else if (error.status === 403) {
            this.errorMessage = 'Forbidden: You do not have permission to perform this action.';
          } else if (error.status === 404) {
            this.errorMessage = 'Not Found: The requested resource was not found.';
          } else if (error.status === 500) {
            this.errorMessage = 'Internal Server Error: An unexpected error occurred on the server.';
          } else {
            this.errorMessage = 'An error occurred. Please try again later.';
          }
          this.successMessage = '';
        }
      )
    }
    emitCloseModal(): void {
      this.closeModal.emit();
    }
}
