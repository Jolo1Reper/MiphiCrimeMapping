using Domain.Interfaces;

namespace Application.UseCases.GetWantedPerson
{
    public class GetWantedPersonUseCase : IGetWantedPersonUseCase
    {
        private IWantedPersonRepository _repo;
        public GetWantedPersonUseCase(IWantedPersonRepository repository)
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
