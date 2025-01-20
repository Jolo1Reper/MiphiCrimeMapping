using Application.UseCases.CreateWantedPerson;
using Application.UseCases.DeleteWantedPerson;
using Application.UseCases.SelectAllWantedPersons;
using Application.UseCases.GetWantedPerson;
using Application.UseCases.UpdateWantedPerson;
using Microsoft.AspNetCore.Mvc;
using Application.UseCases.GetAllWantedPerson;
using Application.Pagination;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/wanted-persons")]
    public class WantedPersonApiController : ControllerBase
    {
        private readonly ISelectAllWantedPersonsUseCase _selectAllWantedPersons;
        private readonly IGetAllWantedPersonUseCase _getAllWantedPersons;
        private readonly IGetWantedPersonUseCase _getWantedPerson;
        private readonly ICreateWantedPersonUseCase _createWantedPerson;
        private readonly IUpdateWantedPersonUseCase _updateWantedPerson;
        private readonly IDeleteWantedPersonUseCase _deleteWantedPerson;
        public WantedPersonApiController(
            ISelectAllWantedPersonsUseCase selectAllWantedPersons,
            IGetAllWantedPersonUseCase getAllWantedPersons,
            IGetWantedPersonUseCase getWantedPerson,
            ICreateWantedPersonUseCase createWantedPerson,
            IUpdateWantedPersonUseCase updateWantedPerson,
            IDeleteWantedPersonUseCase deleteWantedPerson)
        {
            _selectAllWantedPersons = selectAllWantedPersons;
            _getAllWantedPersons = getAllWantedPersons;
            _getWantedPerson = getWantedPerson;
            _createWantedPerson = createWantedPerson;
            _updateWantedPerson = updateWantedPerson;
            _deleteWantedPerson = deleteWantedPerson;
        }

        [HttpGet("basic")]
        public async Task<IActionResult> SelectAllWantedPersons()
        {
            var response = await _selectAllWantedPersons.Handle();

            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllWantedPersons([FromQuery] PaginationSearchParameters request)
        {
            var response = await _getAllWantedPersons.Handle(request);

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

        [HttpPost]
        public async Task<IActionResult> AddCrimeType([FromBody] CreateWantedPersonRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _createWantedPerson.Handle(request);

            if (response is null)
                return BadRequest(new { Message = "Such a wanted person already exists." });

            return CreatedAtAction(nameof(GetWantedPerson), new { response.Id }, response);
        }

        [HttpPatch]
        public async Task<IActionResult> UpdateCrimeType([FromBody] UpdateWantedPersonRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _updateWantedPerson.Handle(request);

            if (response is null)
                return BadRequest(new { Message = "Not found a type of crime with this id." });

            return Ok(response);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> RemoveCrimeType(Guid id)
        {
            var response = await _deleteWantedPerson.Handle(id);

            if(!response)
                return NotFound();

            return Ok();
        }
    }
}
