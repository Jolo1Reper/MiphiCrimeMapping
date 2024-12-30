using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Application.DTOs.Requests;
using Application.DTOs.Responses;
using Application.UseCases.Interfaces;
using Application.UseCases;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/crime-marks")]
    public class MephiApiController : ControllerBase
    {
        private readonly IGetAllCrimeUseCase _getAllUseCase;
        private readonly ICreateCrimeUseCase _createCrimeUseCase;
        private readonly IGetCrimeUseCase _getCrimeUseCase;
        private readonly IUpdateCrimeUseCase _updateCrimeUseCase;
        public MephiApiController(IGetAllCrimeUseCase getAllCrimeUseCase, ICreateCrimeUseCase createCrimeUseCase, IGetCrimeUseCase getCrimeUseCase, IUpdateCrimeUseCase updateCrimeUseCase)
        {
            _getAllUseCase = getAllCrimeUseCase; 
            _createCrimeUseCase = createCrimeUseCase;
            _getCrimeUseCase = getCrimeUseCase;
            _updateCrimeUseCase = updateCrimeUseCase;
        }

        [HttpPost]
        public async Task<IActionResult> AddCrimeMark([FromBody] CreateCrimeRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _createCrimeUseCase.Handle(request);

            return CreatedAtAction(nameof(ShowCrimeMark), new { id = response.Id }, response);
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

            if(crimeDto == null)
            {
                return NotFound(new { Message = $"Crime with ID {id} not found." });
            }

            return Ok(crimeDto);
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
        public IActionResult RemoveCrimeMark(Guid id) 
        {
            throw new NotImplementedException();
        }
    }
}