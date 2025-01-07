using Domain.Entities;
using Domain.Interfaces;
using System.IO;

namespace Application.UseCases.UpdateWantedPerson
{
    public class UpdateWantedPersonUseCase : IUpdateWantedPersonUseCase
    {
        private readonly ICrimeReportRepository _repo;
        public UpdateWantedPersonUseCase(ICrimeReportRepository repository)
        {
            _repo = repository;
        }
        public async Task<CrimeReportResponse?> Handle(UpdateWantedPersonRequest request)
        {
            WantedPerson person = new() { Id = request.Id, Name = request.Name, Surname = request.Surname, BirthDate = request.BirthDate };

            await _repo.UpdateWantedPerson(person);

            return new CrimeReportResponse(person.Id, "Wanted person successfully edited.");
        }
    }
}
