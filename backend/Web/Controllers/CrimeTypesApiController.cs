using Application.UseCases.CreateCrimeType;
using Application.UseCases.DeleteCrimeType;
using Application.UseCases.SelectAllCrimeTypes;
using Application.UseCases.GetCrimeType;
using Application.UseCases.UpdateCrimeType;
using Microsoft.AspNetCore.Mvc;
using Application.UseCases.GetAllCrimeTypes;
using Application.Pagination;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/crime-types")]
    public class CrimeTypesApiController : ControllerBase
    {
        private readonly ISelectAllCrimeTypesUseCase _selectAllCrimeTypes;
        private readonly IGetAllCrimeTypesUseCase _getAllCrimeTypes;
        private readonly IGetCrimeTypeUseCase _getCrimeType;
        private readonly ICreateCrimeTypeUseCase _createCrimeType;
        private readonly IUpdateCrimeTypeUseCase _updateCrimeType;
        private readonly IDeleteCrimeTypeUseCase _deleteCrimeType;
        public CrimeTypesApiController(
            ISelectAllCrimeTypesUseCase selectAllCrimeTypes,
            IGetAllCrimeTypesUseCase getAllCrimeTypes,
            IGetCrimeTypeUseCase getCrimeType,
            ICreateCrimeTypeUseCase createCrimeType,
            IUpdateCrimeTypeUseCase updateCrimeType,
            IDeleteCrimeTypeUseCase deleteCrimeType)
        {
            _selectAllCrimeTypes = selectAllCrimeTypes;
            _getAllCrimeTypes = getAllCrimeTypes;
            _getCrimeType = getCrimeType;
            _createCrimeType = createCrimeType;
            _updateCrimeType = updateCrimeType;
            _deleteCrimeType = deleteCrimeType;
        }

        [HttpGet("titles")]
        public async Task<IActionResult> SelectAllCrimeTypes()
        {
            var response = await _selectAllCrimeTypes.Handle();

            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCrimeTypes([FromQuery] PaginationSearchParameters request)
        {
            var response = await _getAllCrimeTypes.Handle(request);

            return Ok(response);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetCrimeType(Guid id)
        {
            var response = await _getCrimeType.Handle(id);

            if (response == null)
            {
                return NotFound(new { Message = $"Crime type with ID {id} not found." });
            }

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> AddCrimeType([FromBody] CreateCrimeTypeRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _createCrimeType.Handle(request);

            if(response is null)
                return BadRequest(new { Message = "A type of crime with this title already exists." });

            return CreatedAtAction(nameof(GetCrimeType), new { Id = response.Id }, response);
        }

        [HttpPatch]
        public async Task<IActionResult> UpdateCrimeType([FromBody] UpdateCrimeTypeRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _updateCrimeType.Handle(request);

            if (response is null)
                return BadRequest(new { Message = "Not found a type of crime with this id." });

            return Ok(response);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> RemoveCrimeType(Guid id)
        {
            var response = await _deleteCrimeType.Handle(id);
            if(!response)
                return NotFound();

            return Ok();
        }
    }
}
