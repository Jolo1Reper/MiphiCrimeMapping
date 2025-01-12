using Application.Services.Interfaces;
using Application.UseCases.CreateCrime;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.UseCases.CreateCrimeType
{
    public class CreateCrimeTypeUseCase : ICreateCrimeTypeUseCase
    {
        private readonly ICrimeTypeRepository _repo;
        public CreateCrimeTypeUseCase(ICrimeTypeRepository _crimeRepository)
        {
            _repo = _crimeRepository;
        }
        public async Task<CrimeReportResponse?> Handle(CreateCrimeTypeRequest request)
        {
            if(_repo.ContainCrimeType(request.Title))
                return null;

            CrimeType type = new() { Title = request.Title, Description = request.Description, Link = request.Link, Color = request.Color };

            await _repo.AddCrimeType(type);
            return new CrimeReportResponse(type.Id, "Crime type successfully created.");
        }
    }
}
