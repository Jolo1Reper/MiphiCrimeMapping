using Domain.Interfaces;

namespace Application.UseCases.GetCrimeType
{
    public class GetCrimeTypeUseCase : IGetCrimeTypeUseCase
    {
        private ICrimeTypeRepository _repo;
        public GetCrimeTypeUseCase(ICrimeTypeRepository repository)
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

            return new GetCrimeTypeResponse(crimeType.Id, crimeType.Title, crimeType.Description);
        }
    }
}
