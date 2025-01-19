using Domain.Interfaces;

namespace Application.UseCases.GetCrime
{
    public class GetCrimeUseCase : IGetCrimeUseCase
    {
        private ICrimeMarkRepository _repo;
        public GetCrimeUseCase(ICrimeMarkRepository repository)
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
            else if (crime.WantedPerson is not null)
            {
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
                    crime.Point.Y,
                    crime.Point.X
                );
            }
            else
            {
                return new GetCrimeResponse
                (
                    crime.Id,
                    crime.TypeId,
                    crime.Type.Title,
                    crime.WantedPersonId,
                    null,
                    null,
                    null,
                    crime.CreateAt,
                    crime.CrimeDate,
                    crime.Location,
                    crime.Point.Y,
                    crime.Point.X
                );
            }

        }
    }
}
