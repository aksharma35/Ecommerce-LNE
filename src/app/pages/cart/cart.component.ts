import { Component, OnInit } from '@angular/core';
import { CartwishlistService } from 'src/app/services/cartWishlist/cartwishlist.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent  implements OnInit {
  webUrl:any=environment.EndPoint;  
  products : any = [];
  wishList : any = [];
  grandTotal !: number;
  constructor(private cartService:CartwishlistService){

  }
  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }

  minusQuant(product:any){
    this.cartService.removeCartItemNumber(product);
  }

  plusQuant(product:any){
    this.cartService.addtoCart(product);
  }

  onWhislist(product:any){
    this.cartService.removeCartItem(product);
    this.cartService.addToWishlist(product);
  }

  removeItem(product:any,type:any){
    if(type == 'products'){
      this.cartService.removeCartItem(product);
    }else{
      this.wishList.map((a:any, index:any)=>{
        if(product.id=== a.id){
          this.wishList.splice(index,1);
        }
      })
    }
  }

  lengthOfCartList(){
    let length=0;
      this.products.forEach((product:any) => {
        length += 1*(product.quantity)
      });
    return length;
  }
}
