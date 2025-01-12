using Domain.Interfaces;

namespace Application.UseCases.SelectAllCrimeTypes
{
    public class SelectAllCrimeTypesUseCase : ISelectAllCrimeTypesUseCase
    {
        private readonly ICrimeTypeRepository _repo;
        public SelectAllCrimeTypesUseCase(ICrimeTypeRepository repository)
        {
            _repo = repository;
        }

        public async Task<IEnumerable<SelectCrimeTypeResponse>> Handle()
        {
            var CrimeTypes = await _repo.GetAllCrimeTypes();

            IEnumerable<SelectCrimeTypeResponse> crimeTypeDtos = CrimeTypes.Select(t => new SelectCrimeTypeResponse(t.Id, t.Title, t.Color));
            return crimeTypeDtos;
        }
    }
}
