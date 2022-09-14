export class APIs {
  // Account
  public static Account = {
    Register: 'apiUrl',
    UserProfile: '/api/user-profile',
  };


 // Building

 public static Building = {
  GetBuildings: 'api/Building/GetBuildings',

};



 // Projects

 public static projects = {
  AddAttachments: 'api/Project/Attachments',
  AddMasterPlane:'api/Project/MasterPlane',
  addSpecifications:'api/Project/Specifications',
  GetProjects:"api/Project/ProjectsWithImagesAndVideos"

};
 // property

 public static properties = {
  AddAttachments: 'api/Apartment/Attachments',
  List:"api/Apartment/ApartmentsWithImagesAndVideos",
  apartmentDetails:'api/Apartment/ApartmentById'

};




}
