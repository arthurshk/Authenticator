using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Authenticator.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpGet("secure")]
        [Authorize]
        public IActionResult GetSecureData()
        {
            return Ok(new { message = "This is secure data" });
        }
    }
}
