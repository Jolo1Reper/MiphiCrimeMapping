using Domain.Interfaces;

namespace Application.UseCases.GetAllWantedPerson
{
    public class GetAllWantedPersonUseCase : IGetAllWantedPersonUseCase
    {
        private readonly IWantedPersonRepository _repo;
        public GetAllWantedPersonUseCase(IWantedPersonRepository repository)
        {
            _repo = repository;
        }

        public async Task<IEnumerable<GetAllWantedPersonResponse>> Handle()
        {
            var wantedPersons = await _repo.GetAllWantedPersonsWithCounts();

            IEnumerable<GetAllWantedPersonResponse> personDtos = wantedPersons.Select(p => new GetAllWantedPersonResponse(p.WantedPerson.Id, 
                p.WantedPerson.Name, p.WantedPerson.Surname, p.WantedPerson.Patronymic, p.WantedPerson.BirthDate,
                p.WantedPerson.RegistrationAddress, p.WantedPerson.AddInfo, p.CrimeCount));
            return personDtos;
        }
    }
}
