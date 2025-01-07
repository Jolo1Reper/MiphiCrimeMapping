using Domain.Entities;
using Domain.Interfaces;
using System.Reflection.Metadata;

namespace Application.UseCases.CreateWantedPerson
{
    public class CreateWantedPersonUseCase : ICreateWantedPersonUseCase
    {
        private readonly ICrimeReportRepository _repo;
        public CreateWantedPersonUseCase(ICrimeReportRepository repository)
        {
            _repo = repository;
        }

        public async Task<CrimeReportResponse?> Handle(CreateWantedPersonRequest request)
        {
            if (_repo.ContainWantedPerson(request.Name, request.Surname, DateTime.SpecifyKind(request.BirthDate, DateTimeKind.Utc)))
                return null;

            WantedPerson person = new() { Name = request.Name, Surname = request.Surname, BirthDate = DateTime.SpecifyKind(request.BirthDate, DateTimeKind.Utc) };
            
            await _repo.AddWantedPerson(person);
            return new CrimeReportResponse(person.Id, "Wanted person successfully created.");


        }
    }
}
