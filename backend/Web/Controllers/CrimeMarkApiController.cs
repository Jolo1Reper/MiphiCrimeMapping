using Microsoft.AspNetCore.Mvc;
using Application.DTOs.Requests;
using Application.DTOs.Responses;
using Application.UseCases.Interfaces;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/crime-marks")]
    public class CrimeMarkApiController : ControllerBase
    {
        private readonly IGetAllCrimesUseCase _getAllUseCase;
        private readonly ICreateCrimeUseCase _createCrimeUseCase;
        private readonly IGetCrimeUseCase _getCrimeUseCase;
        private readonly IUpdateCrimeUseCase _updateCrimeUseCase;
        private readonly IDeleteCrimeUseCase _deleteCrimeUseCase;
        public CrimeMarkApiController(
            IGetAllCrimesUseCase getAllCrimeUseCase, 
            ICreateCrimeUseCase createCrimeUseCase, 
            IGetCrimeUseCase getCrimeUseCase, 
            IUpdateCrimeUseCase updateCrimeUseCase,
            IDeleteCrimeUseCase deleteCrimeUseCase)
        {
            _getAllUseCase = getAllCrimeUseCase; 
            _createCrimeUseCase = createCrimeUseCase;
            _getCrimeUseCase = getCrimeUseCase;
            _updateCrimeUseCase = updateCrimeUseCase;
            _deleteCrimeUseCase = deleteCrimeUseCase;
        }

        [HttpGet]
        public async Task<IActionResult> ShowAllCrimeMarks()
        {
            IEnumerable<ShowOnMapCrimeResponse> response = await _getAllUseCase.Handle();

            return Ok(response);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> ShowCrimeMark(Guid id)
        {
            var crimeDto = await _getCrimeUseCase.Handle(id);

            if (crimeDto == null)
            {
                return NotFound(new { Message = $"Crime with ID {id} not found." });
            }

            return Ok(crimeDto);
        }

        [HttpPost]
        public async Task<IActionResult> AddCrimeMark([FromBody] CreateCrimeRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _createCrimeUseCase.Handle(request);
            if (response is null)
            {
                return BadRequest(response);
            }

            return CreatedAtAction(nameof(ShowCrimeMark), new { id = response.Id }, response);
        }

        [HttpPatch]
        public async Task<IActionResult> UpdateCrimeMark([FromBody] UpdateCrimeRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _updateCrimeUseCase.Handle(request);

            return Ok(response);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> RemoveCrimeMark(Guid id) 
        {
            await _deleteCrimeUseCase.Handle(id);
            return Ok();
        }
    }
}