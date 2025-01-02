using Application.UseCases.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/wanted-persons")]
    public class WantedPersonApiController : ControllerBase
    {
        IGetAllWantedPersonsUseCase _getAllWantedPersons;
        IGetWantedPersonUseCase _getWantedPerson;
        public WantedPersonApiController(IGetAllWantedPersonsUseCase getAllWantedPersons, IGetWantedPersonUseCase getWantedPerson)
        {
            _getAllWantedPersons = getAllWantedPersons;
            _getWantedPerson = getWantedPerson;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllWantedPersons()
        {
            var response = await _getAllWantedPersons.Handle();

            return Ok(response);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetWantedPerson(Guid id)
        {
            var response = await _getWantedPerson.Handle(id);

            if (response == null)
            {
                return NotFound(new { Message = $"Wanted person with ID {id} not found." });
            }

            return Ok(response);
        }
    }
}
