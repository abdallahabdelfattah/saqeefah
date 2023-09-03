import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { ProjectAndListService } from 'src/app/services/project-lists.service';
import { Helper } from 'src/app/shared/helper/helper';
import { environment } from 'src/environments/environment';
import { MasterPlan } from '../../Models/masterPlan';
import { pickList } from '../../Models/picklist';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AttachmentService } from '../services/attachment.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  projectOverView: string
  masterPlanData:MasterPlan[]=[] as MasterPlan[];
  types:pickList[]=[]as pickList[];
  imageMapHardCode: string
  masterPlaneImage: File = null
  specificationsImage: File = null
  grantiesImage: File = null
  projectId: any
  projectImageThumb: File = null
  projectImageGallery: File[] = []
  formData: FormData = new FormData()
  masterPlaneFormData: FormData = new FormData
  specificationsFormData: FormData = new FormData
  uploadWorking: boolean = false
  masterPlaneUploadMessage: string

  onInputChange(event) {
    if (event.target.files) {
      this.projectImageThumb = <File>event.target.files[0]
    }
  }

  onGalleryInputChange(event) {
    this.projectImageGallery=[];
    if (event.target.files) {
      for (var i = 0; i < event.target.files.length; i++) {
        this.projectImageGallery.push(<File>event.target.files[i])
      }
    }
  }
  uploadImage(e) {
    this.uploadWorking = true
    e.preventDefault();
    this.formData = new FormData();
    if(this.projectImageThumb)
    {
      if(!Helper.allowedFileSize(this.projectImageThumb))
      {
        this.toastr.error("Max File allowed  500 kb ");
        this.uploadWorking = false;
        this.projectImageGallery=[];
        this.masterPlanData=[] as MasterPlan[];
        this.ngOnInit();
        return;
      }
    this.formData.append('CoverImage', this.projectImageThumb, this.projectImageThumb.name)
    }
    this.formData.append('Project_Id', this.projectId)

    for (var i = 0; i < this.projectImageGallery.length; i++) {
      if(!Helper.allowedFileSize(this.projectImageGallery[i]))
      {
        this.toastr.error("Max File allowed  500 kb ");
        this.uploadWorking = false;
        this.projectImageGallery=[];
        this.masterPlanData=[] as MasterPlan[];
        this.ngOnInit();

        return;
      }

      this.formData.append("Images", this.projectImageGallery[i], this.projectImageGallery[i].name);
    }
    this.editProject.uploadProjectImage(this.formData).subscribe((resp) => {
      if (!resp.isError) {
        this.toastr.success("Successfully Uploaded")
        this.uploadWorking = false;
        this.projectImageGallery=[];
        this.masterPlanData=[] as MasterPlan[];
        this.ngOnInit();


      }
      else{
        this.toastr.error("Failed Uploaded")
      }
    })
  }
  onMasterPlaneInputChange(event) {
    if (event.target.files) {
      this.masterPlaneImage = <File>event.target.files[0];
    }


  }
  UploadMasterPlane(e) {
    this.masterPlaneFormData=new FormData();

    this.uploadWorking = true
    this.masterPlaneFormData.append('Project_Id', this.projectId)
    if(this.masterPlaneImage)
    this.masterPlaneFormData.append('MasterPlaneImage', this.masterPlaneImage, this.masterPlaneImage?.name)
    let data=JSON.stringify(this.masterPlanData);
    this.masterPlaneFormData.append('JsonMapCodeString', data)
    this.masterPlaneFormData.append('ProjectOverview', this.projectOverView)
    this.editProject.uploadProjectMasterPlane(this.masterPlaneFormData).subscribe((resp) => {
      if (!resp.isError) {
        this.uploadWorking = false
        this.masterPlaneUploadMessage = resp.message
        this.masterPlanData=[] as MasterPlan[];
        this.toastr.success("Successfully Updated")

        this.ngOnInit();
        // this.uploadWorking = false
        // this.masterPlaneUploadMessage = resp.message
      }
      else{
        this.toastr.error("Failed Updated")
      }
    })

  }
  onSpecificationsInputChange(event) {
    if (event.target.files) {
      this.specificationsImage = <File>event.target.files[0];
    }


  }
  onGrantiesInputChange(event) {
    if (event.target.files) {
      this.grantiesImage = <File>event.target.files[0];
    }


  }
  UploadSpecifications(e) {
    this.uploadWorking = true
    this.specificationsFormData.append('Project_Id', this.projectId)
    this.specificationsFormData.append('Specifications', this.specificationsImage, this.specificationsImage.name)
    this.specificationsFormData.append('Granties', this.grantiesImage, this.grantiesImage.name)
    this.editProject.uploadProjectSpecifications(this.specificationsFormData).subscribe((resp) => {

      if (!resp.isError) {
        this.toastr.success("Successfully Uploaded")
        this.uploadWorking = false
        this.masterPlanData=[] as MasterPlan[];
        this.ngOnInit();
      }
      else{
        this.toastr.error("Failed Uploaded")
      }
    })

  }
  constructor(private editProject: ProjectAndListService,private modalService: NgbModal,
    private route: ActivatedRoute, private sanitizer: DomSanitizer
    , private attachmentService: AttachmentService,
    private language: changeLanguageService,
    private toastr: ToastrService) { }
  mastePlanImage: any;
  coverImage: any;
  PgrantiesImage: any;
  PspecificationsImage: any;
  gallaryImages: any[];

  appRootUrl = environment.appRoot + '/';
  ngOnInit(): void {


    this.projectId = this.route.snapshot.paramMap.get('id');
    this.editProject.getProjectDetails(this.language.getLanguageID(), this.projectId).subscribe(x => {
      if (x['succeeded']) {
        if (x['data']['masterPlane'] != null) {
          this.projectOverView=x['data'].masterPlane?.projectOverview;
          this.initData(x['data'].masterPlane?.mapCodeArray);
          this.mastePlanImage = x['data'].masterPlane?.masterPlaneImage;
        }

        this.coverImage = x['data']['coverImage'];
        this.gallaryImages = x['data']['images'];
        if (x['data']['specifications'] != null)
          this.PgrantiesImage = x['data']['specifications']['grantiesImage'];
        else
          this.PgrantiesImage = null;
        if (x['data']['specifications'] != null)
          this.PspecificationsImage = x['data']['specifications']['specificationsImage'];
        else
          this.PspecificationsImage = null;
           this.projectImageThumb= null;
           this.projectImageGallery= [];

      }

    })

  }
  initData(x:any){
    if(this.types.length==0)
    {
      this.types.push({id:'Rect',value:'Rect'});
      this.types.push({id:'Poly',value:'Poly'});
      this.types.push({id:'Circle',value:'Circle'});
    }

    if(x.length==0)
      this.masterPlanData.push({id:'',cords:'',shape:''});
      else{
        x.forEach(e=>{
          this.masterPlanData.push({id:e.id,cords:e.cords,shape:e.shape});
        });
      }
  }
  delete(id: any) {
    this.modalService.open(ConfirmationDialogComponent, { size: 'sm' }).closed.subscribe(res => {
      if (res) {
    this.attachmentService.deleteAttachment(id, "Project").subscribe(res => {
      if (!res.isError) {
        this.toastr.success("Successfully Deleted")
       this.ngOnInit();
      }
      else{
        this.toastr.error("Failed Deleted")
      }
    })
  }
  else{

  }
})
  }
  deleteAttachment(type: number) {
    this.modalService.open(ConfirmationDialogComponent, { size: 'sm' }).closed.subscribe(res => {
      if (res) {
    this.attachmentService.deleteProjectAttachments(this.projectId, type).subscribe(res => {
      if (!res.isError) {
        this.toastr.success("Successfully Deleted")
       this.ngOnInit();
      }
      else{
        this.toastr.error("Failed Deleted")
      }
    })
  }else{}
});
  }
  addData(){
    this.masterPlanData.push({id:'',cords:'',shape:''});
  }
  DeleteData(ind:any){
    this.masterPlanData.splice(ind,1);
  }
  onchange(event,index,t){
    switch(t){
      case 1:
    this.masterPlanData[index].shape=event.target.value;
        break;
        case 2:
    this.masterPlanData[index].id=event.target.value;

          break;
          case 3:
    this.masterPlanData[index].cords=event.target.value;

            break;

    }

  }

}
