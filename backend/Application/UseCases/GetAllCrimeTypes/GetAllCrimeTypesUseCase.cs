using Domain.Interfaces;

namespace Application.UseCases.GetAllCrimeTypes
{
    public class GetAllCrimeTypesUseCase : IGetAllCrimeTypesUseCase
    {
        private readonly ICrimeTypeRepository _repo;
        public GetAllCrimeTypesUseCase(ICrimeTypeRepository repository)
        {
            _repo = repository;
        }

        public async Task<IEnumerable<GetAllCrimeTypesResponse>> Handle()
        {
            var crimeTypes = await _repo.GetAllCrimeTypesWithCounts();

            IEnumerable<GetAllCrimeTypesResponse> crimeTypeDtos = crimeTypes.Select(t => new GetAllCrimeTypesResponse(t.CrimeType.Id, 
                t.CrimeType.Title, t.CrimeType.Description, t.CrimeType.Link, t.CrimeType.Color, t.CrimeCount));
            return crimeTypeDtos;
        }
    }
}
