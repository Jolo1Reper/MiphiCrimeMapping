using Domain.Entities;
using Domain.Interfaces;

namespace Application.UseCases.UpdateCrimeType
{
    public class UpdateCrimeTypeUseCase : IUpdateCrimeTypeUseCase
    {
        private readonly ICrimeTypeRepository _repo;
        public UpdateCrimeTypeUseCase(ICrimeTypeRepository repository)
        {
            _repo = repository;
        }

        public async Task<CrimeReportResponse?> Handle(UpdateCrimeTypeRequest request)
        {
            CrimeType crimeType = new() { Id = request.Id, Title = request.Title, Description = request.Description, Link = request.Link, Color = request.Color };

            await _repo.UpdateCrimeType(crimeType);

            return new CrimeReportResponse(crimeType.Id, "Crime type successfully edited.");
        }
    }
}
