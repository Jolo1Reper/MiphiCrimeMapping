using Application.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Web.Dto;

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
        public async Task<IActionResult> CreateCrime([FromBody] CreateCrimeDto request)
        {
            var crime = new Crime()
            {
                Type = new() { Title = request.CrimeTypeTitle },
                Location = request.Location,
                WantedPerson = new() { Name = request.WantedPersonName, Surname = request.WantedPersonSurname, BirthDate = DateTime.SpecifyKind(request.WantedPersonBirthDate, DateTimeKind.Utc) },
                Point = new() { X = request.XPoint, Y = request.YPoint },
            };

            await _service.CreateCrime(crime);

            return Ok();
        }

        [HttpGet]
        public IActionResult ShowAllCrimes()
        {
            IEnumerable<ShowOnMapCrimeDto> crimes = _service.GetAllCrimes()
                .Select(c => new ShowOnMapCrimeDto(c.Type.Title, c.Location, c.Point.X, c.Point.Y));

            return Ok(crimes);
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetCrime(int id)
        {
            throw new NotImplementedException();
        }

        [HttpPatch]
        public IActionResult UpdateCrime([FromBody] ShowOnMapCrimeDto request)
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
