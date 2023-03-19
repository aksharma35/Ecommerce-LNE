import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { CartwishlistService } from 'src/app/services/cartWishlist/cartwishlist.service';
import { HomepageService } from 'src/app/services/homepage/homepage.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
    webUrl: any = environment.EndPoint;
    types: any;
    categoryList: any[] = [];
    public productList: any;
    public filterCategory: any
    searchKey: string = "";
    constructor(private homepageService: HomepageService,
        private cartService: CartwishlistService,
        private apiService: ApiService) {

    }
    ngOnInit(): void {
        this.homepageService.getProduct()
            .subscribe(res => {
                this.productList = res;
                this.filterCategory = res;
                this.productList.forEach((a: any) => {
                    if (a.category === "women's clothing" || a.category === "men's clothing") {
                        a.category = "fashion"
                    }
                    Object.assign(a, { quantity: 1, total: a.price });
                });
                console.log(this.productList)
            });

        this.cartService.search.subscribe((val: any) => {
            this.searchKey = val;
        })
        this.getType();
    }
    addtocart(item: any) {
        this.cartService.addtoCart(item);
    }

    getType() {
        this.apiService.getTypes().subscribe({
            next: (res: any) => {
                if (res.statusCode === "200") {
                    this.types = res.data
                } else {
                    alert(res.statusMessage);
                }
            }
        })
    }
    filterType: string = '';
    filter(category: string, subCategory?: string) {
        if (subCategory == undefined) {
            this.filterType = category;
            this.filterCategory = this.productList
                .filter((a: any) => {
                    if (a.type == category || category == '') {
                        return a;
                    }
                })
            this.getCategory(category);
        } else {
            this.filterType = category;
            this.filterCategory = this.productList
                .filter((a: any) => {
                    if ((a.type == category || category == '') && (a.category == subCategory || a.subCategory == '')) {
                        return a;
                    }
                })
            this.getCategory(category);
        }
    }

    getCategory(type: any) {
        let typeId;
        this.types.forEach((element: any) => {
            if (element.displayName == type) {
                typeId = element.id;
            }
        });
        if (typeId !== null && typeId !== undefined && typeId !== '') {
            this.getCategoryApi(typeId);
        } else {
            this.categoryList = [];
        }
    }

    getCategoryApi(id: any) {
        this.apiService.findByParentId(id).subscribe({
            next: (res: any) => {
                if (res.statusCode === "200") {
                    this.categoryList = res.data;
                } else {
                    alert(res.statusMessage)
                }
            }
        })
    }
    selectedItem: any;
    onFilterCategory(subCategory: any) {
        this.selectedItem = subCategory;
        this.filter(this.filterType, subCategory)
    }

}
