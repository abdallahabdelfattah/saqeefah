import { AfterViewChecked, AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Editor, Toolbar } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { SliderTypes } from 'src/app/shared/Enums/enums';
import { environment } from 'src/environments/environment';
import { ConfirmationDialogComponent } from '../../../confirmation-dialog/confirmation-dialog.component';
import jsonDoc from '../../models/doc';
import { ISlider, ISliderAttachment } from '../../models/slider.interface';
import { SliderService } from '../../services/slider.service';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss']
})
export class PartnerComponent implements OnInit,OnDestroy{
  @Output() public click: EventEmitter<MouseEvent> = new EventEmitter();
  showError = false;
  images: Array<File> = [];
  formData: FormData = new FormData();
  spaceregex = /^(\s+\S+\s*)*(?!\s).*$/;
  editordoc =jsonDoc;

  editor: Editor;
  editor1:Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  appRootUrl = environment.appRoot + '/';
  public slider: ISlider = {} as ISlider;
  imageList: ISliderAttachment[] = [];

  public myFormGroup: FormGroup = new FormGroup({
    TitleEn: new FormControl('', [Validators.required]),
    TitleAr: new FormControl('', [Validators.required]),
    DescriptionEn: new FormControl(Validators.required),
    DescriptionAr: new FormControl(Validators.required),
    IsActive: new FormControl(),
  });





  constructor(private sliderService: SliderService,private toastr: ToastrService,private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.editor = new Editor();
    this.editor1 = new Editor();
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
    this.slider = {
      titleEn: this.myFormGroup.value.TitleEn,
      titleAr: this.myFormGroup.value.TitleAr,
      descriptionEn: this.myFormGroup.value.DescriptionEn,
      descriptionAr: this.myFormGroup.value.DescriptionAr,
      isActive: this.myFormGroup.value.IsActive,
      id: SliderTypes.OurPartners,
    };
    this.sliderService.UpdateSlider(this.slider).subscribe(r => {
      if (!r.isError) {
       this.toastr.success("Successfully Updated")
        this.getAllSliderAttatchments();
      } else {
        this.toastr.error('Failed Updated');
      }
    })

  }

  initializeFormGroup() {
    this.myFormGroup.setValue({
      TitleEn: '',
      TitleAr: '',
      DescriptionEn: '',
      DescriptionAr: '',
      IsActive: true,
    })
  }

  onInputChange(event) {
    this.images=[];
    if (event.target.files) {
      for (var i = 0; i < event.target.files.length; i++) {
        this.images.push(<File>event.target.files[i])
      }
    }
  }
  DeleteImage(attachmentId: number) {
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
  }else{

  }
})
  }

  getAllSliderAttatchments() {
    this.sliderService.getAllSliderByid(SliderTypes.OurPartners).subscribe(res => {
      if (!res.isError) {
        this.slider = res.result.data;
      }
    })
  }



  uploadImages(e) {
    e.stopPropagation();
    if (this.images.length > 0) {
      let sliderTypeId= SliderTypes.OurPartners;
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

  ngOnDestroy(): void {
    this.editor.destroy();
    this.editor1.destroy();
  }

}
