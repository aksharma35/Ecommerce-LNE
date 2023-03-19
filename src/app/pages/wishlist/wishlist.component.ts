import { Component, OnInit } from '@angular/core';
import { CartwishlistService } from 'src/app/services/cartWishlist/cartwishlist.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent  implements OnInit {
  public wishList : any = [];
  webUrl:any = environment.EndPoint;
   constructor(private cart:CartwishlistService){

   }
  ngOnInit(): void {
    this.cart.getWishList()
    .subscribe(res=>{
      this.wishList = res;
    })
  }
  moveToCart(item:any){
    this.removeItem(item,'wishList');
    this.cart.addtoCart(item);
  }

  removeItem(item: any,list:string){
    if(list == 'products'){
      this.cart.removeCartItem(item);
    }else{
      this.wishList.map((a:any, index:any)=>{
        if(item.id=== a.id){
          this.wishList.splice(index,1);
        }
      })
    }
  }
}
