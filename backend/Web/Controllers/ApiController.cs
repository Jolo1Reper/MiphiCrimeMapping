using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Web.Contracts;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/crimes")]
    public class ApiWordController : ControllerBase
    {
        ICrimeService _service;
        public ApiWordController(ICrimeService service)
        {
            _service = service; 
        }

        [HttpPost]
        public IActionResult CreateCrime([FromBody] CrimeDto request)
        {
            throw new NotImplementedException();
        }

        [HttpGet]
        public IActionResult ShowCrimes()
        {
            throw new NotImplementedException();
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetCrime(int id)
        {
            throw new NotImplementedException();
        }

        [HttpPatch]
        public IActionResult UpdateCrime([FromBody] CrimeDto request)
        {
            throw new NotImplementedException();
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult RemoveCrime(int id) 
        {
            throw new NotImplementedException();
        }
    }
}
