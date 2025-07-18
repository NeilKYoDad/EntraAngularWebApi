export const environment = {
  production: false,
  msalConfig: {
    auth: {
      clientId: '',
      authority: '',
    },
  },
  graphApiConfig: {
    scopes: ['user.read'],
    uri: 'https://graph.microsoft.com/v1.0/me',
  },
    weatherApiConfig: {
    endpoint: '', // Your C# Web API's actual URL and endpoint
    endpointUser: '', // Your C# Web API's actual URL and endpoint
    endpointAdmin: '', // Your C# Web API's actual URL and endpoint
    endpointUserAdmin: '', // Your C# Web API's actual URL and endpoint
    scopes: [''], // The scope you exposed for your C# Web API
  },
};
