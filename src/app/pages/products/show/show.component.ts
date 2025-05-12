import { ChangeDetectionStrategy, Component, inject, Injector, Input, numberAttribute, OnInit, runInInjectionContext } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../models/product.mode';
import { ProductService } from '../../../services/product.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-show',
  imports: [NgIf],
  templateUrl: './show.component.html',
  styleUrl: './show.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductShowComponent implements OnInit {

  // @Input({ required: true, transform: numberAttribute }) id!: number
  injector = inject(Injector)
  @Input() product: Product | undefined = undefined

  productService = inject(ProductService)

  // product$!: Observable<Product | undefined>

  ngOnInit(): void {
    // this.product$ = this.productService.getProduct(this.id)
    // runInInjectionContext(this.injector, () => this.product = toSignal(this.productService.getProduct(id), { initialValue: undefined}))
  }

}
