using Domain.Interfaces;

namespace Application.UseCases.SelectAllWantedPersons
{
    public class SelectAllWantedPersonsUseCase : ISelectAllWantedPersonsUseCase
    {
        IWantedPersonRepository _repo;
        public SelectAllWantedPersonsUseCase(IWantedPersonRepository repository)
        {
            _repo = repository;
        }
        public async Task<IEnumerable<SelectAllWantedPersonResponse>> Handle()
        {
            var persons = await _repo.GetAllWantedPersons();

            IEnumerable<SelectAllWantedPersonResponse> personsDtos = persons.Select(
                p => new SelectAllWantedPersonResponse(p.Id, p.Name, p.Surname, p.Patronymic, p.BirthDate));
            return personsDtos;
        }
    }
}
