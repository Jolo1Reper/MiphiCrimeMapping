using Domain.Entities;
using Domain.Interfaces;

namespace Application.UseCases.CreateWantedPerson
{
    public class CreateWantedPersonUseCase : ICreateWantedPersonUseCase
    {
        private readonly IWantedPersonRepository _repo;
        public CreateWantedPersonUseCase(IWantedPersonRepository repository)
        {
            _repo = repository;
        }

        public async Task<CrimeReportResponse?> Handle(CreateWantedPersonRequest request)
        {
            if (_repo.ContainWantedPerson(request.Name, request.Surname, request.Patronymic, DateTime.SpecifyKind(request.BirthDate, DateTimeKind.Utc)))
                return null;

            WantedPerson person = new() { Name = request.Name, Surname = request.Surname, Patronymic = request.Patronymic,
                BirthDate = DateTime.SpecifyKind(request.BirthDate, DateTimeKind.Utc), 
                RegistrationAddress = request.RegistrationAddress, AddInfo = request.AddInfo };
            
            await _repo.AddWantedPerson(person);
            return new CrimeReportResponse(person.Id, "Wanted person successfully created.");


        }
    }
}
