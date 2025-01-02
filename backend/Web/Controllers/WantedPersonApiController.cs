using Application.UseCases.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/wanted-persons")]
    public class WantedPersonApiController : ControllerBase
    {
        IGetAllWantedPersonsUseCase _getAllWantedPersons;
        public WantedPersonApiController(IGetAllWantedPersonsUseCase getAllWantedPersons)
        {
            _getAllWantedPersons = getAllWantedPersons;
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
            throw new NotImplementedException();
        }
    }
}
