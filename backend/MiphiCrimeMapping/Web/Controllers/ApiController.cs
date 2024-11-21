using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Web.Contracts;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/")]
    public class ApiWordController : ControllerBase
    {
        IWordService _service;
        public ApiWordController(IWordService service)
        {
            _service = service; 
        }

        [HttpPost]
        [Route("merge")]
        public IResult Merge([FromBody] WordRequest request)
        {
            try
            {
                string text = _service.GetToIdAndMerge(request.Id, request.title);
                return Results.Ok(text);
            }
            catch
            {
                return Results.BadRequest();
            }
        }
    }
}
