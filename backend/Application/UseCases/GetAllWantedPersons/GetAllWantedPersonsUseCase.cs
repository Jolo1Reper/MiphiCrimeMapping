using Domain.Interfaces;

namespace Application.UseCases.GetAllWantedPersons
{
    public class GetAllWantedPersonsUseCase : IGetAllWantedPersonsUseCase
    {
        ICrimeReportRepository _repo;
        public GetAllWantedPersonsUseCase(ICrimeReportRepository repository)
        {
            _repo = repository;
        }
        public async Task<IEnumerable<SelectWantedPersonResponse>> Handle()
        {
            var persons = await _repo.GetAllWantedPersons();

            IEnumerable<SelectWantedPersonResponse> personsDtos = persons.Select(p => new SelectWantedPersonResponse(p.Id, p.Name, p.Surname, p.BirthDate));
            return personsDtos;
        }
    }
}
