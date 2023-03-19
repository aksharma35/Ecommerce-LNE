import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddProuductService } from 'src/app/services/add-product/add-prouduct.service';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
declare var $:any;

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productList:any[]=[];
  addProductForm!:FormGroup;
  editProductForm!:FormGroup;
  submitAddProduct:boolean=false;
  webUrl:string = environment.EndPoint;
  constructor(private router:Router,
              private fb:FormBuilder,
              private addProduct:AddProuductService,
              private apiService:ApiService) { }

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      title:["",Validators.required],
      description:["",Validators.required],
      quantity:["",Validators.required],
      price:[,Validators.required],
      type:["",Validators.required],
      category:[""],
      subCategory:[""],
      rating:[,Validators.required],
      file:["",Validators.required],
      fileSource:[""],
    })
    this.editProductForm = this.fb.group({
      title:[""],
      description:[""],
      quantity:[""],
      price:[],
      type:[""],
      category:[""],
      subCategory:[""],
      rating:[],
      file:[""],
      fileSource:[""],
    })
    this.getAllProducts();
    this.getAllTypes();
  }
  // ['refNum'].errors

  get Validate(){
    return this.addProductForm.controls
  }

  getAllProducts(){
    this.addProduct.findAllProducts().subscribe({
      next:(res:any)=>{
        if(res.statusCode === "200"){
          this.productList = res.data;
        }else{
          alert(res.statusMessage);
        }
      }
    })
  }

  total(quantity:number,price:number){
    return quantity*price
  }

  openAddProductModal(){
    this.submitAddProduct=false; 
    this.addProductForm.reset();
    $('#addProduct').modal('show')
  }

  closeAddProductModal(){
    this.categoryList = []
    this.subCategoryList=[]
    $('#addProduct').modal('hide')
  }


  allTypes:any[]=[];
  getAllTypes(){
    this.apiService.getTypes().subscribe({
      next:(res:any)=>{
        if(res.statusCode === "200"){
          this.allTypes = res.data;
        }else{
          alert(res.statusMessage);
        }
      }
    })
  }

  onSelectType(event:any){
    let selectedType:any;
    this.allTypes.map((element:any)=>{
      if(element.displayValue == event.target.value){
        selectedType = element
      }
    })
    this.getCategory(selectedType);
  }

  categoryList:any[]=[];
  getCategory(type:any){
    this.apiService.findByParentId(type.id).subscribe({
      next:(res:any)=>{
        if(res.statusCode === "200"){
          this.categoryList = res.data;
        }else{
          alert(res.statusMessage);
        }
      }
    })
  }


  onSelectCategory(category:any){
    let selectedCategory:any;
    this.categoryList.map((element:any)=>{
      if(element.displayValue == category.target.value){
        selectedCategory = element
      }
    })
    // this.getSubCategory(selectedCategory);
  }

  subCategoryList:any[]=[];
  getSubCategory(type:any){
    this.apiService.findByParentId(type.id).subscribe({
      next:(res:any)=>{
        if(res.statusCode === "200"){
          this.subCategoryList = res.data;
        }else{
          alert(res.statusMessage);
        }
      }
    })
  }

  onAddProduct(){
    this.submitAddProduct= true;
    if(this.addProductForm.invalid){
      alert("Please fill all the required fields");
      return;
    }
    let body = new FormData();
    if (this.addProductForm.value.title !== null && this.addProductForm.value.title !== undefined) body.append("title", this.addProductForm.value.title);
    if (this.addProductForm.value.description !== null && this.addProductForm.value.description !== undefined) body.append("description", this.addProductForm.value.description);
    if (this.addProductForm.value.quantity !== null && this.addProductForm.value.quantity !== undefined) body.append("quantity", this.addProductForm.value.quantity);
    if (this.addProductForm.value.price !== null && this.addProductForm.value.price !== undefined) body.append("price", this.addProductForm.value.price);
    if (this.addProductForm.value.type !== null && this.addProductForm.value.type !== undefined) body.append("type", this.addProductForm.value.type);
    if (this.addProductForm.value.category !== null && this.addProductForm.value.category !== undefined) body.append("category", this.addProductForm.value.category);
    if (this.addProductForm.value.subCategory !== null && this.addProductForm.value.subCategory !== undefined) body.append("subCategory", this.addProductForm.value.subCategory);
    if (this.addProductForm.value.rating !== null && this.addProductForm.value.rating !== undefined) body.append("rating", this.addProductForm.value.rating);
    if (this.addProductForm.value.fileSource !== null && this.addProductForm.value.fileSource !== undefined) body.append("file", this.addProductForm.value.fileSource);
    this.addProduct.addProducts(body).subscribe({
      next:(res:any)=>{
        if(res.statusCode == "200"){
          this.getAllProducts();
          this.closeAddProductModal();
        }else{
          alert(res.statusMessage);
        }
      }
    })
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.addProductForm.patchValue({
        fileSource: file,
      });
    }
  }


}
