
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
    sliderAttachment?:Array<ISliderAttachment>
}
export interface ISliderAttachment {
    attachmentId: number;
    path: string;
}



export interface AttachmentDeleteDto {
    attachmentsIds: Array<number>;
}

