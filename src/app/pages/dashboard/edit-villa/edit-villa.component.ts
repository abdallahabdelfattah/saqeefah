import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AttachmentService } from '../services/attachment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { VillaService } from 'src/app/services/villa.service';
import { Helper } from 'src/app/shared/helper/helper';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-edit-villa',
  templateUrl: './edit-villa.component.html',
  styleUrls: ['./edit-villa.component.scss']
})
export class EditVillaComponent implements OnInit {

  villaId: any
  uploadWorking = false
  projectId: any
  imageThumb: File = null
  imageGallery: File[] = []
  formData: FormData = new FormData();
  coverImage: any;
  gallaryImages: any[];
  appRootUrl = environment.appRoot + '/';
  villa:any;
  constructor(private attachmentService: AttachmentService, private modalService: NgbModal, private villaService: VillaService, private route: ActivatedRoute, private sanitizer: DomSanitizer,
    private toastr: ToastrService) { }

  onInputChange(event) {
    if (event.target.files) {
      this.imageThumb = <File>event.target.files[0]
      console.log('file data', this.imageThumb)
    }
  }
  onGalleryInputChange(event) {
    this.imageGallery = [];
    if (event.target.files) {
      for (var i = 0; i < event.target.files.length; i++) {
        this.imageGallery.push(<File>event.target.files[i])
      }
    }
  }
  uploadImage(e) {
    this.uploadWorking = true
    e.preventDefault();
if(!this.imageThumb &&  this.imageGallery.length==0)
{
  this.toastr.error("must select image or images gallery !");
  return;
}

    this.formData = new FormData();
    if (this.imageThumb) {
      if (!Helper.allowedFileSize(this.imageThumb)) {
        this.toastr.error("Max File allowed  500 kb ");
        return;
      }
      this.formData.append('CoverImage', this.imageThumb, this.imageThumb.name)
    }

    this.formData.append('Villa_Id', this.villaId)
    this.formData.append('Project_Id', this.projectId)
    for (var i = 0; i < this.imageGallery.length; i++) {
      if (!Helper.allowedFileSize(this.imageGallery[i])) {
        this.toastr.error("Max File allowed  500 kb ");
        return;
      }
      this.formData.append("Images", this.imageGallery[i], this.imageGallery[i].name);
    }
    this.villaService.uploadVillaImage(this.formData).subscribe((resp) => {
      if (!resp.isError) {
        this.toastr.success("Successfully Updated")
        this.ngOnInit();
        this.uploadWorking = false;
        this.imageGallery = [];
      }
      else {
        this.toastr.error("Failed Updated")
      }

    })
  }


  ngOnInit(): void {
    this.villaId = this.route.snapshot.paramMap.get('villaId');
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    this.villaService.getVillaDetails(this.villaId).subscribe(res => {
      if (!res.isError) {
        console.log(res)
        this.coverImage = res.result['data']['coverImage'];
        this.gallaryImages = res.result['data']['images'];
        this.villa=res.result.data;
      }
    })
  }
  delete(id: any) {
    this.modalService.open(ConfirmationDialogComponent, { size: 'sm' }).closed.subscribe(res => {
      if (res) {
        this.attachmentService.deleteAttachment(id, "Villa").subscribe(res => {
          if (!res.isError) {
            this.toastr.success("Successfully Deleted")
            this.ngOnInit();
          }
          else {
            this.toastr.error("Failed Deleted")
          }
        })
      }
      else { }
    });
  }
  deleteCover() {
    this.modalService.open(ConfirmationDialogComponent, { size: 'sm' }).closed.subscribe(res => {
      if (res) {
        this.attachmentService.deleteVillaCoverImage(this.villaId).subscribe(res => {
          if (!res.isError) {
            this.toastr.success("Successfully Deleted")
            this.ngOnInit();
          }
          else {
            this.toastr.error("Failed Deleted")
          }

        })
      } else { }
    });
  }


}
