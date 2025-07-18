// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  msalConfig: {
    auth: {
      clientId: 'ENTER_CLIENT_ID',
      authority: 'ENTER_AUTHORITY',
    },
  },
  graphApiConfig: {
    scopes: ['ENTER_SCOPE'],
    uri: 'ENTER_URI',
  },
  weatherApiConfig: {
    endpoint: 'ENTER', // Your C# Web API's actual URL and endpoint
    endpointUser: 'ENTER', // Your C# Web API's actual URL and endpoint
    endpointAdmin: 'ENTER', // Your C# Web API's actual URL and endpoint
    endpointUserAdmin: 'ENTER', // Your C# Web API's actual URL and endpoint
    scopes: ['ENTER'], // The scope you exposed for your C# Web API
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

// wcdrtgvd;2
