import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Editor, Toolbar } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { SliderTypes } from 'src/app/shared/Enums/enums';
import { Helper } from 'src/app/shared/helper/helper';
import { environment } from 'src/environments/environment';
import { ConfirmationDialogComponent } from '../../../confirmation-dialog/confirmation-dialog.component';
import jsonDoc from '../../models/doc';
import { ISlider, ISliderAttachment } from '../../models/slider.interface';
import { SliderService } from '../../services/slider.service';
@Component({
  selector: 'app-home-slider-banner',
  templateUrl: './home-slider-banner.component.html',
  styleUrls: ['./home-slider-banner.component.scss']
})
export class HomeSliderBannerComponent implements OnInit{
  @Output() public click: EventEmitter<MouseEvent> = new EventEmitter();
  showError = false;
  images: Array<File> = [];
  formData: FormData = new FormData();
 
  
  appRootUrl = environment.appRoot + '/';
  public slider: ISlider = {} as ISlider;
  imageList: ISliderAttachment[] = [];

  public myFormGroup: FormGroup = new FormGroup({
    id:new FormControl(0),
  
    TitleEn: new FormControl('', [Validators.required]),
    TitleAr: new FormControl('', [Validators.required]),
    DescriptionEn: new FormControl(Validators.required),
    DescriptionAr: new FormControl(Validators.required),
  
  });





  constructor(private sliderService: SliderService,private toastr: ToastrService,private modalService: NgbModal) {
  }

  ngOnInit(): void {
   
    this.initializeFormGroup();
    this.getAllSliderAttatchments();

  }


  onClickSubmit(e) {
    e.stopPropagation();
    this.click.emit(e);
    if (this.myFormGroup.invalid) {
      this.showError = true;
      return;
    }
    
    if(this.images.length>0)
    {
      if(!Helper.allowedFileSize(this.images[0]))
      {
        this.toastr.error("Max File allowed  500 kb"); 
        return; 
      }
    }

    if (this.images.length > 0) {
      let sliderTypeId= SliderTypes.SliderHomeBanar;
      this.formData = new FormData();
      //this.formData.append('SliderId',sliderTypeId.toString())
      this.formData.append('SliderId', sliderTypeId.toString())
      this.formData.append('TitleEn',this.myFormGroup.value.TitleEn)
      this.formData.append('TitleAr',this.myFormGroup.value.TitleAr)
      this.formData.append('DescriptionEn',this.myFormGroup.value.DescriptionEn)
      this.formData.append('DescriptionAr',this.myFormGroup.value.DescriptionAr)
     
      for (var  index = 0; index < this.images.length; index++) {
        this.formData.append('Image', this.images[index], this.images[index].name);
      }
    }
    console.log('formdata',this.formData)
    this.sliderService.AddHomeSlider(this.formData).subscribe(r => {
      if (!r.isError) {
       this.toastr.success("Successfully Updated")
        this.getAllSliderAttatchments();
      } else {
        this.toastr.error('Failed Updated');
      }
    })

    this.myFormGroup.reset();
    //this.images=[];

  }

  initializeFormGroup() {
    this.myFormGroup.setValue({
      id:0,
      TitleEn: '',
      TitleAr: '',
      DescriptionEn: '',
      DescriptionAr: '',
    })
  }

  onInputChange(event) {
    this.images=[];
    if (event.target.files) {
        this.images.push(<File>event.target.files[0])
    }
  }
  DeleteImage(attachmentId: number) {
    this.sliderService.deleteSliderAttachment(attachmentId).subscribe(r => {
      if (!r.isError) {
        this.toastr.success("Successfully Deleted")
        this.getAllSliderAttatchments();
        this.ngOnInit();
        
      }
      else{
        this.toastr.error("Failed Deleted")
      }
    });
  }

  getAllSliderAttatchments() {
    this.sliderService.getAllSliderByid(SliderTypes.SliderHomeBanar).subscribe(res => {
      if (!res.isError) {
        this.slider = res.result.data;
      }
    })
  }



  uploadImages(e) {
    e.stopPropagation();
    if (this.images.length > 0) {
      let sliderTypeId= SliderTypes.SliderHomeBanar;
      this.formData = new FormData();
      this.formData.append('SliderId',sliderTypeId.toString())
      for (var  index = 0; index < this.images.length; index++) {
        this.formData.append('Images', this.images[index], this.images[index].name);
      }
      this.sliderService.uploadAttachmentImagesSlider(this.formData).subscribe(r => {
         if(r['succeeded'])
         {
          this.toastr.success("Successfully Uploaded");
          this.getAllSliderAttatchments();
          this.images=[]; 
         }
         else{
          this.toastr.error(r['message'])
         }
      });


    }

  }

  DeleteRow(attachmentId:number){

    this.modalService.open(ConfirmationDialogComponent, { size: 'sm' }).closed.subscribe(res => {
      if (res) {
        this.sliderService.deleteSliderAttachment(attachmentId).subscribe(r => {
          if (!r.isError) {
            this.toastr.success("Successfully Deleted")
            this.getAllSliderAttatchments();
            this.ngOnInit();
            
          }
          else{
            this.toastr.error("Failed Deleted")
          }
        });
      }
      else {
        // this.note.warn(':: test')
      }
    });





    // this.sliderService.deleteSliderAttachment(attachmentId).subscribe(r => {
    //   if (!r.isError) {
    //     this.toastr.success("Successfully Deleted")
    //     this.getAllSliderAttatchments();
    //     this.ngOnInit();
        
    //   }
    //   else{
    //     this.toastr.error("Failed Deleted")
    //   }
    // });

  }

}
