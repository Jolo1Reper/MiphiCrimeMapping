using Application.DTOs.Responses;
using Application.UseCases.Interfaces;
using Domain.Interfaces;

namespace Application.UseCases
{
    public class GetCrimeTypeUseCase : IGetCrimeTypeUseCase
    {
        private ICrimeReportRepository _repo;
        public GetCrimeTypeUseCase(ICrimeReportRepository repository)
        {
            _repo = repository;
        }
        public async Task<GetCrimeTypeResponse?> Handle(Guid id)
        {
            var crimeType = await _repo.GetCrimeTypeById(id);

            if (crimeType == null)
            {
                return null;
            }

            return new GetCrimeTypeResponse(crimeType.Id, crimeType.Title);
        }
    }
}
