import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { SettingTypes } from 'src/app/shared/Enums/enums';
import { environment } from 'src/environments/environment';
import { AttachmentService } from '../../../services/attachment.service';
import { SettingsService } from '../../services/settings.service';
import jsonDoc from '../../models/doc';
import { ConfirmationDialogComponent } from '../../../confirmation-dialog/confirmation-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Helper } from 'src/app/shared/helper/helper';

@Component({
  selector: 'app-setting-form',
  templateUrl: './setting-form.component.html',
  styleUrls: ['./setting-form.component.scss']
})
export class SettingFormComponent implements OnInit, OnDestroy {

  @Input() collapseId: number = 1;

  @Input() SettingTypeId: number;

  @Input() SettingTypeTitle: string;

  SettingId: number;

  appRootUrl = environment.appRoot + '/';
  currentFormData: any
  iconCss: any
  submitted: boolean = false;
  ImageThumb: File = null
  formData: FormData = new FormData()
  showError: boolean = false;
  spaceRegex = /^(\s+\S+\s*)*(?!\s).*$/;
  editordoc = jsonDoc;

  editor: Editor;
  editor1: Editor;
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

  constructor(private setting: SettingsService, private modalService: NgbModal, private toastr: ToastrService, private attachment: AttachmentService) {


  }

  public myFormGroup: FormGroup = new FormGroup({
    settingTypeId: new FormControl(0),
    TitleEn: new FormControl('', [Validators.required]),
    TitleAr: new FormControl('', [Validators.required]),
    DescriptionEn: new FormControl([Validators.required]),
    DescriptionAr: new FormControl([Validators.required]),
    iconCss: new FormControl('', [Validators.required]),
  });


  ngOnInit(): void {
    this.editor = new Editor();
    this.editor1 = new Editor();

    this.initializeFormGroup();
    this.setting.getsettingsById(this.SettingTypeId).subscribe(res => {
      if (!res.isError) {
        this.currentFormData = res.result.data
      }

    })
  }


  onInputChange(event) {

    if (event.target.files) {
      this.ImageThumb = <File>event.target.files[0]
    }
  }

  onClickSubmit() {

    this.submitted = true;
    if (this.myFormGroup.invalid) {
      this.showError = true;
      return;
    }

    if (this.ImageThumb) {
      if (!Helper.allowedFileSize(this.ImageThumb)) {
        this.toastr.error("Max File allowed  500 kb");
        return;
      }
    }
    let setting = {
      settingTypeId: this.myFormGroup.value.settingTypeId,
      TitleEn: this.myFormGroup.value.TitleEn,
      TitleAr: this.myFormGroup.value.TitleAr,
      DescriptionEn: this.myFormGroup.value.DescriptionEn,
      DescriptionAr: this.myFormGroup.value.DescriptionAr,
      iconCss: this.myFormGroup.value.iconCss,
    };

    if (this.ImageThumb != null) {
      this.formData.append('SettingImage', this.ImageThumb, this.ImageThumb.name);

    }
    this.formData.append('TitleAr', setting.TitleAr);
    this.formData.append('TitleEn', setting.TitleEn);
    this.formData.append('DescriptionAr', setting.DescriptionAr);
    this.formData.append('DescriptionEn', setting.DescriptionEn);
    this.formData.append('SettingTypeId', setting.settingTypeId);
    this.formData.append('IconCss', setting.iconCss);

    this.setting.setSetting(this.formData).subscribe(
      res => {
        if (res.status = true) {

          this.toastr.success('Successfully Updated');
          this.showError = false;
          // this.myFormGroup.reset();
          this.submitted = false;
          //window.location.reload()
          this.ngOnInit();
        }
        else {
          this.toastr.error('Failed Updated')

        }

      })

  }
  onIconPickerSelect(icon: string): void {
    this.iconCss = icon;
    this.myFormGroup.controls['iconCss'].setValue(icon);
  }


  initializeFormGroup() {

    this.myFormGroup.setValue({
      settingTypeId: this.SettingTypeId,
      TitleEn: '',
      TitleAr: '',
      DescriptionEn: '',
      DescriptionAr: '',
      iconCss: 'fas fa-user'
    })
  }
  delete() {
    this.modalService.open(ConfirmationDialogComponent, { size: 'sm' }).closed.subscribe(res => {
      if (res) {
        this.attachment.deleteSettingImage(this.SettingTypeId).subscribe(res => {
          if (!res.isError) {
            this.toastr.success("Successfully Deleted")
            this.ngOnInit();
          }
          else {
            this.toastr.error("Failed Deleted")
          }

        })
      }
      else {

      }
    });
  }



  ngOnDestroy(): void {
    this.editor.destroy();
    this.editor1.destroy();
  }

}
