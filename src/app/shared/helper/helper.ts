import { DatePipe } from "@angular/common";

export class Helper {

    // format date in typescript
    public static getFormatedDate(date: Date, format: string) {
        const datePipe = new DatePipe('en-US');
        return datePipe.transform(date, format);
    }


    public static allowedFileSize(file: any) {
        const fileSize = file.size / 1024 / 1024; // in MiB
        return !(fileSize > 2)
      }

      



}


