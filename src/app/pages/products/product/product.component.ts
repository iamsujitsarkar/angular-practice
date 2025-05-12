import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Observable } from 'rxjs';
import { Product } from '../../../models/product.mode';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [NgIf, NgFor, AsyncPipe, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  productService = inject(ProductService)

  products$!: Observable<Product[] | []>;

  ngOnInit(): void {

    this.products$ = this.productService.getProducts()
  }
}
