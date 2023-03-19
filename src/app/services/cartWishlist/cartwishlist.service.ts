import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartwishlistService {
  public cartItemList : any =[]
  public wishList : any =[]
  public productList = new BehaviorSubject<any>([]);
  public wishListTotal = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor() { }
  getProducts(){
    return this.productList.asObservable();
  }
  getWishList(){
    return this.wishListTotal.asObservable();
  }

  setProduct(product : any){
    debugger
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addtoCart(product : any){
    if(this.cartItemList.length){
      for(let i=0;i<this.cartItemList.length;i++){
        if(this.cartItemList[i].id === product.id){
          this.cartItemList[i].quantity +=1;
          this.productList.next(this.cartItemList);
          this.getTotalPrice();
          return
        }else if(i == this.cartItemList.length-1){
          this.cartItemList.push(product);
          this.productList.next(this.cartItemList);
          this.getTotalPrice();
          return;
        }
      }
    }else{
      this.cartItemList.push(product);
      console.log(this.cartItemList);
      this.productList.next(this.cartItemList);
    }
  }
  addToWishlist(product : any){
    this.wishList.push(product);
    this.wishListTotal.next(this.wishList);
  }


  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += (a.total*a.quantity) ;
    })
    return grandTotal;
  }
  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }

  removeCartItemNumber(item:any){
    this.cartItemList.map((a:any, index:any)=>{
      if(item.id=== a.id){
        a.quantity -= 1;
      }
    })
    this.productList.next(this.cartItemList);
  }
}
