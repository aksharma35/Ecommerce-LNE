import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
declare var $:any

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  addTypeForm!:FormGroup;
  addChildForm!:FormGroup;
  addGrandChildForm!:FormGroup;
  editForm!:FormGroup;
  typesList:any[]=[];
  constructor(private fb:FormBuilder,
              private apiService:ApiService) { }
  ngOnInit(): void {
    this.addTypeForm = this.fb.group({
      type:[""],
      displayName:[""],
      displayValue:[""],
      parentId:[""],
      activeFlag:[]
    });
    this.addChildForm = this.fb.group({
      type:[""],
      displayName:[""],
      displayValue:[""],
      parentId:[""],
      activeFlag:[]
    });
    this.addGrandChildForm = this.fb.group({
      type:[""],
      displayName:[""],
      displayValue:[""],
      parentId:[""],
      activeFlag:[]
    });

    this.getAllType();
  }

  selectedItem:any;
  onShowEditModal(selectedEdit:any){
    this.selectedItem = selectedEdit;
    this.editForm.patchValue(selectedEdit);
    $('#editFormModal').modal('show'); 
  }

  onHideEditModal(){
    $('#editFormModal').modal('hide'); 
  }
  onShowModal(){
    this.addTypeForm.reset();
    this.addTypeForm.controls['activeFlag'].setValue(true);
    $('#genericAddForm').modal('show'); 
  }

  onHideModal(){
    $('#genericAddForm').modal('hide'); 
  }

  onShowChildModal(parent:any){
    this.addChildForm.reset();
    this.addChildForm.controls['parentId'].setValue(parent.id);
    this.addChildForm.controls['activeFlag'].setValue(true);
    $('#genericAddChildForm').modal('show'); 
  }

  onHideChildModal(){
    $('#genericAddChildForm').modal('hide'); 
  }

  onShowGrandChildModal(parent:any){
    this.addGrandChildForm.reset();
    this.addGrandChildForm.controls['parentId'].setValue(parent.id);
    this.addGrandChildForm.controls['activeFlag'].setValue(true);
    $('#genericAddGrandChildForm').modal('show'); 
  }

  onHideGrandChildModal(){
    $('#genericAddGrandChildForm').modal('hide'); 
  }

  addType(){
    this.addTypeForm.controls['type'].setValue('PRODUCTS_TYPE')
    this.apiService.addLov(this.addTypeForm.value).subscribe({
      next:(res:any) => {
        if(res.statusCode === "200"){
          this.getAllType();
          this.onHideModal();
        }else{
          alert(res.statusMessage);
        }
      }
    })
  }

  addChild(){
    this.addChildForm.controls['type'].setValue('PRODUCTS_CATEGORY')
    this.apiService.addLov(this.addChildForm.value).subscribe({
      next:(res:any) => {
        if(res.statusCode === "200"){
          this.getAllType();
          this.onHideChildModal();
        }else{
          alert(res.statusMessage);
        }
      }
    })
  }

  addGrandChild(){
    this.addGrandChildForm.controls['type'].setValue('PRODUCTS_SUB_CATEGORY')
    this.apiService.addLov(this.addGrandChildForm.value).subscribe({
      next:(res:any) => {
        if(res.statusCode === "200"){
          this.getAllType();
          this.onHideGrandChildModal();
        }else{
          alert(res.statusMessage);
        }
      }
    })
  }


  getAllType(){
    this.apiService.getTypes().subscribe({
      next:(res:any)=>{
        if(res.statusCode === "200"){
          this.typesList = res.data;
        }else{
          alert(res.statusMessage);
        }
      }
    })
  }

  childList:any[]=[];
  getChild(type:any){
    setTimeout(() => {
      this.apiService.findByParentId(type.id).subscribe({
        next:(res:any)=>{
          if(res.statusCode === "200"){
            this.childList = res.data;
          }else{
            alert(res.statusMessage);
          }
        }
      })
    }, 100);
  }

  grandChildList:any[]=[];
  getGrandChild(type:any){
    setTimeout(() => {
      this.apiService.findByParentId(type.id).subscribe({
        next:(res:any)=>{
          if(res.statusCode === "200"){
            this.grandChildList = res.data;
          }else{
            alert(res.statusMessage);
          }
        }
      })
    }, 100);
  }

  editConfiguration(){
    this.apiService.updateLov(this.selectedItem.id,this.editForm.value).subscribe({
      next:(res:any)=>{
        if(res.statusCode === "200"){
          this.getAllType();
          this.onHideEditModal();
        }else{
          alert(res.statusMessage);
        }
      }
    })
  }

  deleteLov(lov:any){
    if(confirm("Are you sure you want to delete")){
      this.apiService.deleteLov(lov.id).subscribe({
        next:(res:any)=>{
          if(res.statusCode === "200"){
            alert(res.statusMessage);
            this.getAllType();
          }else{
            alert(res.statusMessage);
          }
        }
      })

    }
  }
}
