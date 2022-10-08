
export interface ISlidersResponses {
    succeeded: boolean;
    message: string;
    errors: string;
    data: Array<ISlider>
}

export interface ISliderResponses {
    succeeded: boolean;
    message: string;
    errors: string;
    data: ISlider
}

export interface ISlider {
    id?: number;
    titleEn: string;
    titleAr: string;
    descriptionAr: string;
    descriptionEn: string;
    isActive?:boolean;
    sliderAttachment?:Array<ISliderHomeAttachment>
}
// export interface ISliderHome {
//     id?: number;
//     titleEn: string;
//     titleAr: string;
//     descriptionAr: string;
//     descriptionEn: string;
//     isActive?:boolean;
//     sliderAttachment?:Array<ISliderHomeAttachment>
// }

export interface ISliderAttachment {
    attachmentId: number;
    path: string;
}
export interface ISliderHomeAttachment {
    attachmentId: number;
    path: string;
    titleAr:string;
    titleEn:string;
    descriptionAr:string;
    descriptionEn:string;


}



export interface AttachmentDeleteDto {
    attachmentsIds: Array<number>;
}

