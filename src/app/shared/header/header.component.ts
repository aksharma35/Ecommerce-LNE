import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartwishlistService } from 'src/app/services/cartWishlist/cartwishlist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public cartItems : any = [];
  public wishItems : any = [];
  public searchTerm !: string;
  constructor(private cartService : CartwishlistService,
    private router:Router) { }

    ngOnInit(): void {
      this.cartService.getProducts()
      .subscribe(res=>{
        this.cartItems = res;
      })
      this.cartService.getWishList()
      .subscribe(res=>{
        this.wishItems = res;
      })
    }
    search(event:any){
      this.searchTerm = (event.target as HTMLInputElement).value;
      this.cartService.search.next(this.searchTerm);
    }

  homepage(){
    this.router.navigate(['/homepage']);
  }

  onClickRoute(){
    this.router.navigate(['/cart']);
  }

  onClickWishlistRoute(){
    this.router.navigate(['/wishlist']);
  }

  onClickAdminRoute(){
    this.router.navigate(['/admin']);
  }
  
  cartListLength(){
    let length=0;
      this.cartItems.forEach((product:any) => {
        length += 1*(product.quantity)
      });
    return length;
  }

  wishListLength(){
    let length=0;
      length =this.wishItems.length;
    return length;
  }
}
