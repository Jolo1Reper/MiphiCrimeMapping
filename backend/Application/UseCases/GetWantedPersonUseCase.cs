using Application.DTOs.Responses;
using Application.UseCases.Interfaces;
using Domain.Interfaces;

namespace Application.UseCases
{
    public class GetWantedPersonUseCase : IGetWantedPersonUseCase
    {
        private ICrimeReportRepository _repo;
        public GetWantedPersonUseCase(ICrimeReportRepository repository)
        {
            _repo = repository;
        }

        public async Task<GetWantedPersonResponse?> Handle(Guid id)
        {
            var person = await _repo.GetWantedPersonById(id);

            if (person == null)
            {
                return null;
            }

            return new GetWantedPersonResponse
            (
                person.Id,
                person.Name,
                person.Surname,
                person.BirthDate
            );
        }
    }
}
