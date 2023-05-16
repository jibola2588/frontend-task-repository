import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ProductService} from '../services/product.service'
import { Router } from '@angular/router'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 selectedProduct: any = null;
 products : {
  name:string,
  price:string,
  quantity: string
 }[] = []

 showModal:boolean = false
 showEditModal:boolean = false

  constructor(
    private http: HttpClient,
    private productService : ProductService,
    private router : Router
  ){}

  ngOnInit() {
    this.getProducts()
  }

  getProducts() {
   this.productService.getProducts().subscribe(
    (response) => { 
      console.log(response)
      this.products = response
    },
    (error) => { 
      console.log(error)
    }
   )
  }

  toggleModal(){
    this.showModal = !this.showModal
  }

  toggleEditModal(){
    this.showEditModal = false
  }
  
  viewProduct(product:any){
    this.router.navigate(['/product', product._id]);
  }

  editProduct(product:any){
    console.log(product)
    this.showEditModal = true;
    this.selectedProduct = product;
  }
}
