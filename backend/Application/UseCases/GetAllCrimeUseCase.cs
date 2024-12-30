using Domain.Interfaces;
using Domain.Entities;
using Application.UseCases.Interfaces;
using Application.DTOs.Responses;

namespace Application.UseCases
{
    public class GetAllCrimeUseCase : IGetAllCrimeUseCase
    {
        ICrimeReportRepository _repo;
        public GetAllCrimeUseCase(ICrimeReportRepository repository)
        {
            _repo = repository;
        }

        public async Task<IEnumerable<ShowOnMapCrimeResponse>> Handle()
        {
            IEnumerable<Crime> crimes = await _repo.GetAllCrimes();
            IEnumerable<ShowOnMapCrimeResponse> crimeDtos = crimes.Select(c => new ShowOnMapCrimeResponse(
                    c.Id, c.Type.Title, 
                    c.Location, c.Point.Latitude, 
                    c.Point.Longitude));

            return crimeDtos;
        }
    }
}
