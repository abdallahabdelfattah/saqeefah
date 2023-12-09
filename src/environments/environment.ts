// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appRoot:"https://api-stage.saqeefah.com",
 // appRoot:"https://dev.api.saqeefah.com",
 //appRoot:"https://localhost:44301",
  lang:"ar",
  minPrice:500000,
  maxprice:4000000,
  priceStep:50000,
  minArea:100,
  maxArea:1000,
  areaStep:50,
  priceRange:100000,
  areaRange:30,
 //appRoot:"http://localhost:82"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
