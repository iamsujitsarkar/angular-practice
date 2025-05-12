import { inject } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ProductService } from './product.service';
import { of } from 'rxjs';

export const productResolver = (route: ActivatedRouteSnapshot) => {
  const productId = route.paramMap.get('id')

  if(!productId) {
    return of(undefined);
  }
  return inject(ProductService).getProduct(+productId)

}
