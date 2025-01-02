using Application.UseCases.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/crime-types")]
    public class CrimeTypesApiController : ControllerBase
    {
        private readonly IGetAllCrimeTypesUseCase _getAllCrimeTypes;
        private readonly IGetCrimeTypeUseCase _getCrimeType;
        public CrimeTypesApiController(IGetAllCrimeTypesUseCase getAllCrimeTypes, IGetCrimeTypeUseCase getCrimeType)
        {
            _getAllCrimeTypes = getAllCrimeTypes;
            _getCrimeType = getCrimeType;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCrimeTypes()
        {
            var response = await _getAllCrimeTypes.Handle();

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
    }
}
