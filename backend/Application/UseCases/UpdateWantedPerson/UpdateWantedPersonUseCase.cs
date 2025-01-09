using Domain.Entities;
using Domain.Interfaces;
using System.IO;

namespace Application.UseCases.UpdateWantedPerson
{
    public class UpdateWantedPersonUseCase : IUpdateWantedPersonUseCase
    {
        private readonly IWantedPersonRepository _repo;
        public UpdateWantedPersonUseCase(IWantedPersonRepository repository)
        {
            _repo = repository;
        }
        public async Task<CrimeReportResponse?> Handle(UpdateWantedPersonRequest request)
        {
            WantedPerson person = new() { Id = request.Id, 
                Name = request.Name, Surname = request.Surname, Patronymic = request.Patronymic,
                BirthDate = DateTime.SpecifyKind(request.BirthDate, DateTimeKind.Utc), 
                RegistrationAddress = request.RegistrationAddress, AddInfo = request.AddInfo };

            await _repo.UpdateWantedPerson(person);

            return new CrimeReportResponse(person.Id, "Wanted person successfully edited.");
        }
    }
}
