using Domain.Interfaces;
using Domain.Entities;
using Domain.Models;

namespace Application.UseCases.GetAllCrimes
{
    public class GetAllCrimesUseCase : IGetAllCrimesUseCase
    {
        private readonly ICrimeMarkRepository _repo;
        public GetAllCrimesUseCase(ICrimeMarkRepository repository)
        {
            _repo = repository;
        }

        public async Task<IEnumerable<ShowOnMapCrimeResponse>> Handle(CrimeFilterRequest filterRequest)
        {
            IEnumerable<Crime> crimes = await _repo.GetFilteredCrimes(filterRequest);
            IEnumerable<ShowOnMapCrimeResponse> crimeDtos = crimes.Select(c => new ShowOnMapCrimeResponse(
                    c.Id, c.TypeId, c.WantedPersonId,
                    c.Location, 
                    c.Description, 
                    c.CrimeDate,
                    c.Point.Y,
                    c.Point.X)
            );

            return crimeDtos;
        }
    }
}
