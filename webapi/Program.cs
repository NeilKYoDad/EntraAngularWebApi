//Your Program.cs file (for .NET 6 and later) will be modified to add the authentication and authorization middleware.

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using Microsoft.AspNetCore.Authorization; // Added for [Authorize] attribute

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Configure Microsoft Entra ID authentication for the Web API
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));

// Add authorization services
builder.Services.AddAuthorization();

// Configure CORS to allow your SPA to make requests to this API
// IMPORTANT: In a production environment, replace "*" with the specific URL(s) of your Angular SPA.
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            // This origin must match the exact URL (protocol, host, and port) of your Angular app.
            // For local development, it's typically http://localhost:4200
            var origins = builder.Configuration.GetSection("CORSOrigins").Get<string[]>();
            if (origins != null && origins.Length > 0)
            {
                policy.WithOrigins(origins)
                      .AllowAnyHeader()
                      .AllowAnyMethod();
            }
        });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

// Enable CORS middleware. This must be before UseAuthentication and UseAuthorization.
app.UseCors();

// Enable authentication middleware. This must be before UseAuthorization.
app.UseAuthentication();

// Enable authorization middleware.
app.UseAuthorization();

app.MapControllers();

app.Run();

/*
Explanation of Program.cs changes:

using Microsoft.AspNetCore.Authentication.JwtBearer;: Imports the necessary namespace for JWT Bearer token authentication.

using Microsoft.Identity.Web;: Imports the Microsoft Identity Web library, which simplifies integrating with Microsoft Entra ID.

builder.Services.AddAuthentication(...): Configures the authentication services. It tells ASP.NET Core to use JWT Bearer tokens as the default authentication scheme.

.AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd")): This is the core of the Entra ID integration. It reads the "AzureAd" section from your appsettings.json and configures the Web API to validate tokens issued by Microsoft Entra ID.

builder.Services.AddAuthorization();: Adds the authorization services to your application.

builder.Services.AddCors(...): Configures Cross-Origin Resource Sharing (CORS). This is essential because your Angular SPA (running on a different origin/port) needs to make requests to your Web API. Remember to replace http://localhost:4200 and https://your-angular-app-domain.com with the actual URL(s) of your Angular application.

app.UseCors();: Enables the CORS middleware in the request pipeline. It must be placed before UseAuthentication and UseAuthorization.

app.UseAuthentication();: Adds the authentication middleware to the request pipeline. This middleware is responsible for authenticating the incoming request (e.g., validating the JWT token). It must be called before UseAuthorization().

app.UseAuthorization();: Adds the authorization middleware to the request pipeline. This middleware checks if the authenticated user has the necessary permissions to access the requested resource (based on [Authorize] attributes).
*/