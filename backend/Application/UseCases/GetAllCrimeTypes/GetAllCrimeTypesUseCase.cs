using Domain.Entities;
using Domain.Interfaces;

namespace Application.UseCases.GetAllCrimeTypes
{
    public class GetAllCrimeTypesUseCase : IGetAllCrimeTypesUseCase
    {
        private readonly ICrimeReportRepository _repo;
        public GetAllCrimeTypesUseCase(ICrimeReportRepository repository)
        {
            _repo = repository;
        }

        public async Task<IEnumerable<SelectCrimeTypeResponse>> Handle()
        {
            var CrimeTypes = await _repo.GetAllCrimeTypes();

            IEnumerable<SelectCrimeTypeResponse> crimeTypeDtos = CrimeTypes.Select(t => new SelectCrimeTypeResponse(t.Id, t.Title));
            return crimeTypeDtos;
        }
    }
}
