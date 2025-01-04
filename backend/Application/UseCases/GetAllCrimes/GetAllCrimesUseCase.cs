using Domain.Interfaces;
using Domain.Entities;

namespace Application.UseCases.GetAllCrimes
{
    public class GetAllCrimesUseCase : IGetAllCrimesUseCase
    {
        ICrimeReportRepository _repo;
        public GetAllCrimesUseCase(ICrimeReportRepository repository)
        {
            _repo = repository;
        }

        public async Task<IEnumerable<ShowOnMapCrimeResponse>> Handle()
        {
            IEnumerable<Crime> crimes = await _repo.GetAllCrimes();
            IEnumerable<ShowOnMapCrimeResponse> crimeDtos = crimes.Select(c => new ShowOnMapCrimeResponse(
                    c.Id, c.Type.Title,
                    c.Location, c.Point.Latitude,
                    c.Point.Longitude)
            );

            return crimeDtos;
        }
    }
}
