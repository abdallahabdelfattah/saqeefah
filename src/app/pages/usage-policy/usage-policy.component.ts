import { Component, OnInit } from '@angular/core';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';

@Component({
  selector: 'app-usage-policy',
  templateUrl: './usage-policy.component.html',
  styleUrls: ['./usage-policy.component.scss']
})
export class UsagePolicyComponent implements OnInit {

  saqeefahpolicy = [];
  saqeefahpolicyAr=[{
    "title":"الخصوصية وبيان سريّة المعلومات",
    "page":"نقدر مخاوفكم واهتمامكم بشأن خصوصية بياناتكم على شبكة الانترنت.",
    "page1":"لقد تم إعداد هذه السياسة لمساعدتكم في تفهم طبيعة البيانات التي نقوم بتجميعها منكم عند زيارتكم لموقعنا على شبكةالانترنت وكيفية تعاملنا مع هذه البيانات الشخصية."
  },
  {
    "title":"التصفح",
    "page":"لم نقم بتصميم هذا الموقع من أجل تجميع بياناتك الشخصية من جهاز الكمبيوتر الخاص بك أثناء تصفحك لهذا الموقع, وإنما سيتم فقط استخدام البيانات المقدمة من قبلك بمعرفتك ومحض إرادتك.",
    
  },
  {
    "title":"سياسة الخصوصية و عنوان بروتوكول شبكة الانترنت (IP)",
    "page":"في أي وقت تزور فيه اي موقع انترنت بما فيها هذا الموقع ,سيقوم السيرفر المضيف بتسجيل عنوان بروتوكول شبكة الانترنت (IP)الخاص بك ,تاريخ ووقت الزيارة ونوع متصفح الانترنت الذي تستخدمه والعنوان URL الخاص بأي موقع من مواقع الانترنت التي تقوم بإحالتك إلى هذا الموقع على الشبكة.",
   
  },
  {
    "title":" عمليات المسح على الشبكة",
    "page":" إن عمليات المسح التي نقوم بها مباشرة على الشبكة تمكننا من تجميع بيانات محددة مثل البيانات المطلوبة منك بخصوص نظرتك وشعورك تجاه موقعنا.تعتبر ردودك ذات أهمية قصوى ,ومحل تقديرنا حيث أنها تمكننا من تحسين مستوى موقعنا,ولك كامل الحرية واإلختيار في تقديم البيانات المتعلقة بإسمك والبيانات الاخرى.",
 
  },
  {
    "title":" الروابط بالمواقع الاخرى على شبكة الانترنت ",
    "page":" قد يشتمل موقعنا على روابط بالمواقع الاخرى على شبكة الانترنت. او اعلانات من مواقع اخرى مثل AdSense Google لا نعتبر مسئولين عن أساليب تجميع البيانات من قبل تلك المواقع, يمكنك االطالع على سياسات السرية والمحتويات الخاصة بتلك المواقع التي يتم الدخول إليها من خلال أي رابط ضمن هذا الموقع.",
    "page1":" إذا كنت ترغب في مزيد من المعلومات حول هذا الامر وكذلك إذا كنت تريد معرفة الاختيارات المتاحة لك لمنع استخدام هذه المعلومات من قِبل هذه الشركات ،فالرجاء النقر هنا. ",
    "page2":""
  },
  {
    "title":" ",
    "page":"",
    "page1":"",
    "page2":""
  },
  {
    "title":" ",
    "page":"",
    "page1":"",
    "page2":""
  },
  {
    "title":" ",
    "page":"",
    "page1":"",
    "page2":""
  },
  {
    "title":" ",
    "page":"",
    "page1":"",
    "page2":""
  },
  {
    "title":" ",
    "page":"",
    "page1":"",
    "page2":""
  },
  {
    "title":" ",
    "page":"",
    "page1":"",
    "page2":""
  },
  {
    "title":" ",
    "page":"",
    "page1":"",
    "page2":""
  },
  






]
  saqeefahpolicyEN=[{}]
  constructor(private language: changeLanguageService) { }

  ngOnInit(): void {
    this.saqeefahpolicy = this.language.getLanguageID() == "1" ? this.saqeefahpolicyAr : this.saqeefahpolicyEN;
    this.language.changeLanguageStatus.subscribe((data) => {
      this.saqeefahpolicy = this.language.getLanguageID() == "1" ? this.saqeefahpolicyAr : this.saqeefahpolicyEN;
    })
  }

}
