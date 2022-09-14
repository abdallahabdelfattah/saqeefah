
export interface ITestItemResponses  {
  succeeded: boolean;
  message:string; 
  errors:string; 
  data:Array<ITestItem>

 
}
  


export interface ITestItem {
  build_Id: number;
  build_Code: string;
  project_Ref: number;
  floor_Num: number;
  apartment_Num: number;
  build_Descrip: string;
}
  
  