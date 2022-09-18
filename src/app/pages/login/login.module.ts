import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { LangChangeEvent, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';



@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule.forChild({
      defaultLanguage: 'en',
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
      extend: true
  }),
  ],
  providers:[LoginService]
})
export class LoginModule {  constructor( private language:changeLanguageService,private translate: TranslateService) {
  this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
 //   let l =this.language.getCurrentLanguage();
 //   this.language.changeLanguge(l);
 //  this.translate.use(l);
 });
 }
}
export function HttpLoaderFactory(http: HttpClient) {
 return new TranslateHttpLoader(http, '../../../assets/i18n/', '.json');
}