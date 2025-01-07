using Microsoft.AspNetCore.Mvc;
using Application.UseCases.GetAllCrimes;
using Application.UseCases.GetCrime;
using Application.UseCases.CreateCrime;
using Application.UseCases.UpdateCrime;
using Application.UseCases.DeleteCrime;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/crime-marks")]
    public class CrimeMarkApiController : ControllerBase
    {
        private readonly IGetAllCrimesUseCase _getAllCrimes;
        private readonly ICreateCrimeUseCase _createCrime;
        private readonly IGetCrimeUseCase _getCrime;
        private readonly IUpdateCrimeUseCase _updateCrime;
        private readonly IDeleteCrimeUseCase _deleteCrime;

        public CrimeMarkApiController(
            IGetAllCrimesUseCase getAllCrime, 
            ICreateCrimeUseCase createCrime, 
            IGetCrimeUseCase getCrime, 
            IUpdateCrimeUseCase updateCrime,
            IDeleteCrimeUseCase deleteCrime)
        {
            _getAllCrimes = getAllCrime; 
            _createCrime = createCrime;
            _getCrime = getCrime;
            _updateCrime = updateCrime;
            _deleteCrime = deleteCrime;
        }

        [HttpGet]
        public async Task<IActionResult> ShowAllCrimeMarks()
        {
            IEnumerable<ShowOnMapCrimeResponse> response = await _getAllCrimes.Handle();

            return Ok(response);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> ShowCrimeMark(Guid id)
        {
            var crimeDto = await _getCrime.Handle(id);

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

            var response = await _createCrime.Handle(request);
            if (response is null)
                return BadRequest(response);

            return CreatedAtAction(nameof(ShowCrimeMark), new { id = response.Id }, response);
        }

        [HttpPatch]
        public async Task<IActionResult> UpdateCrimeMark([FromBody] UpdateCrimeRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _updateCrime.Handle(request);

            if (response is null)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> RemoveCrimeMark(Guid id) 
        {
            var response = await _deleteCrime.Handle(id);
            if(!response)
                return NotFound();

            return Ok();
        }
    }
}