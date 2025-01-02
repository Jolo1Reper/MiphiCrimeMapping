using Application.DTOs.Responses;
using Application.UseCases.Interfaces;
using Domain.Interfaces;

namespace Application.UseCases
{
    public class GetCrimeUseCase : IGetCrimeUseCase
    {
        private ICrimeReportRepository _repo;
        public GetCrimeUseCase(ICrimeReportRepository repository)
        {
            _repo = repository;
        }
        public async Task<GetCrimeResponse?> Handle(Guid id)
        {
            var crime = await _repo.GetCrimeById(id);

            if (crime == null)
            {
                return null;
            }

            return new GetCrimeResponse
            (
                crime.Id,
                crime.TypeId,
                crime.Type.Title,
                crime.WantedPersonId,
                crime.WantedPerson.Name,
                crime.WantedPerson.Surname,
                crime.WantedPerson.BirthDate,
                crime.CreateAt,
                crime.CrimeDate,
                crime.Location,
                crime.Point.Latitude,
                crime.Point.Longitude
            );
        }
    }
}
