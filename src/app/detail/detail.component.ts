import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {
  id:any;
  product : any; // 

  constructor(
    private route: ActivatedRoute,
    private ProductService : ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params)
      this.id = params['id'];
      this.loadProduct();
    });
  }

  loadProduct(): void {
    console.log(this.id)
    this.ProductService.getSingleProduct(this.id).subscribe(
      (response) =>{
        this.product = response
          console.log(response)
      },
      (error) => { 
        console.log(error)
      }
    )
  }
}



  