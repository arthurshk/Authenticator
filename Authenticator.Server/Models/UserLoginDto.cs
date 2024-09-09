namespace Authenticator.Server.Models
{
    public class UserLoginDto
    {
        public string? Email { get; set; }
        public string? Password { get; set; } 
        public string? Token { get; set; } 
    }
}
