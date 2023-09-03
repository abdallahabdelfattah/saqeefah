import { Component, OnInit } from '@angular/core';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { CompareService } from 'src/app/services/compare.service';
import { ProjectAndListService } from 'src/app/services/project-lists.service';
import { SettingTypes } from 'src/app/shared/Enums/enums';
import { environment } from 'src/environments/environment';
import { SettingsService } from '../dashboard/setting/services/settings.service';
import { compare } from '../Models/Compare';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {
compareList:compare[] = [] as compare[];
compareAvalable!:boolean ;
bannerCompare
bannerCompareUrl
get settingTypes() {
  return SettingTypes
}
  constructor(private appartments:ProjectAndListService, public compareServ:CompareService,private language: changeLanguageService,private setting: SettingsService) { }

  ngOnInit(): void {
    this.getCompareList()
    this.getSetting()
    this.compareServ.changeComparetatus.subscribe((value)=>{
      this.getCompareList()

   })
  }
getCompareList(){
  let currentCompareLocalStorage = window.localStorage.getItem('Compare')!
  if(currentCompareLocalStorage != null){
  let parsingCompare = JSON.parse(currentCompareLocalStorage)
  if(parsingCompare.length > 0){
    this.compareAvalable = true
    this.appartments.getCompareAppartmens(parsingCompare).subscribe((item:any)=>{
      this.compareList = item.data

    })
  } else {
    this.compareAvalable = false
  }
}else {
  this.compareAvalable = false
}
}

appRootUrl=environment.appRoot+'/';
getKeys(){
  let returned:any;
  if(this.compareList.length>0)
      returned= Object.keys(this.compareList[0]);

      return returned;
}


getSetting() {
  return this.setting.getAllsettings(this.language.getLanguageID()).subscribe((response) => {
    if (!response.isError) {
      let allSetting = response.result.data

      this.bannerCompare=allSetting.filter((a:any)=>a.settingTypeId ==SettingTypes.CompareBanar)[0];
      this.bannerCompareUrl=this.getUrl(this.setting.appRootUrl+this.bannerCompare?.imagePath);



    }
  })

}

getUrl(path: string) {
  path = path.replace(/[\/\\]/g, '/');
  path = path.replace(/ /g, '%20');
  return path;
}
}
