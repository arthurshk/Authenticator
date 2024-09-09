using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using Newtonsoft.Json.Linq;
using Authenticator.Server.Models;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly HttpClient _httpClient;

    public AuthController(IConfiguration configuration)
    {
        _configuration = configuration;
        _httpClient = new HttpClient();
    }

    [HttpPost("google-login")]
    public async Task<IActionResult> GoogleLogin([FromBody] UserLoginDto loginDto)
    {
        if (string.IsNullOrEmpty(loginDto.Token))
        {
            return BadRequest("Invalid Google token.");
        }

        var tokenInfoEndpoint = $"https://oauth2.googleapis.com/tokeninfo?id_token={loginDto.Token}";
        var response = await _httpClient.GetAsync(tokenInfoEndpoint);

        if (!response.IsSuccessStatusCode)
        {
            return Unauthorized("Invalid Google token.");
        }

        var tokenInfo = await response.Content.ReadAsStringAsync();
        var payload = JObject.Parse(tokenInfo);

        var audience = payload["aud"]?.ToString();
        if (audience != _configuration["Authentication:Google:ClientId"])
        {
            return Unauthorized("Token was not issued for this application.");
        }

        var email = payload["email"]?.ToString();
        var token = GenerateJwtToken(email);
        return Ok(new { token });
    }

    private string GenerateJwtToken(string email)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, email)
            }),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
