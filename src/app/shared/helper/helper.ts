import { DatePipe } from "@angular/common";

export class Helper {

    // format date in typescript
    public static getFormatedDate(date: Date, format: string) {
        const datePipe = new DatePipe('en-US');
        return datePipe.transform(date, format);
    }




}


