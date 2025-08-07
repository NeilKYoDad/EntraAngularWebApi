export const environment = {
  production: false,
  msalConfig: {
    auth: {
      clientId: 'e2e40f5f-7d95-4f6e-8eda-8f4f93203f3d',
      authority: 'https://login.microsoftonline.com/6782659f-f43e-45c1-82ea-976e0c7bc3f5',
    },
  },
  graphApiConfig: {
    scopes: ['user.read'],
    uri: 'https://graph.microsoft.com/v1.0/me',
  },
    weatherApiConfig: {
    endpoint: 'http://localhost:5159/WeatherForecast', // Your C# Web API's actual URL and endpoint
    endpointUser: 'http://localhost:5159/WeatherForecast/User', // Your C# Web API's actual URL and endpoint
    endpointAdmin: 'http://localhost:5159/WeatherForecast/Admin', // Your C# Web API's actual URL and endpoint
    endpointUserAdmin: 'http://localhost:5159/WeatherForecast/UserAdmin', // Your C# Web API's actual URL and endpoint
    scopes: ['api://525bbb53-a023-401b-a230-020d6f61d37b/access_as_user'], // The scope you exposed for your C# Web API
  },
};
