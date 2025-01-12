using Domain.Interfaces;
using Domain.Entities;

namespace Application.UseCases.GetAllCrimes
{
    public class GetAllCrimesUseCase : IGetAllCrimesUseCase
    {
        ICrimeMarkRepository _repo;
        public GetAllCrimesUseCase(ICrimeMarkRepository repository)
        {
            _repo = repository;
        }

        public async Task<IEnumerable<ShowOnMapCrimeResponse>> Handle()
        {
            IEnumerable<Crime> crimes = await _repo.GetAllCrimes();
            IEnumerable<ShowOnMapCrimeResponse> crimeDtos = crimes.Select(c => new ShowOnMapCrimeResponse(
                    c.Id, c.TypeId,
                    c.Location, c.CrimeDate, c.Point.Latitude,
                    c.Point.Longitude)
            );

            return crimeDtos;
        }
    }
}
