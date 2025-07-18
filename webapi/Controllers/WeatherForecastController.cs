using Microsoft.AspNetCore.Authorization; // Add this using statement
using Microsoft.AspNetCore.Mvc;

namespace MyProtectedWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize] // Add this attribute to protect the entire controller
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet()]
        public IEnumerable<WeatherForecast> Get()
        {
            // You can access user claims here after authentication
            // For example, to get the authenticated user's name:
            var userName = User.Identity?.Name;
            _logger.LogInformation($"Weather forecast requested by: {userName}");

            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpGet("user")]
        [Authorize(Roles = "WeatherUser")]
        public IEnumerable<WeatherForecast> GetUser()
        {
            // You can access user claims here after authentication
            // For example, to get the authenticated user's name:
            var userName = User.Identity?.Name;
            _logger.LogInformation($"Weather forecast requested by: {userName}");

            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = "USER: " + Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpGet("admin")]
        [Authorize(Roles = "WeatherAdmin")]
        public IEnumerable<WeatherForecast> GetAdmin()
        {
            // You can access user claims here after authentication
            // For example, to get the authenticated user's name:
            var userName = User.Identity?.Name;
            _logger.LogInformation($"Weather forecast requested by: {userName}");

            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = "ADMIN: " + Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpGet("useradmin")]
        [Authorize(Roles = "WeatherUser,WeatherAdmin")]
        public IEnumerable<WeatherForecast> GetUserAdmin()
        {
            // You can access user claims here after authentication
            // For example, to get the authenticated user's name:
            var userName = User.Identity?.Name;
            _logger.LogInformation($"Weather forecast requested by: {userName}");

            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = "USERADMIN: " + Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}