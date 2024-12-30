using Application.DTOs.Requests;
using Application.DTOs.Responses;
using Application.UseCases.Interfaces;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.UseCases
{
    public class CreateCrimeUseCase : ICreateCrimeUseCase
    {
        private ICrimeReportRepository _repo;
        public CreateCrimeUseCase(ICrimeReportRepository _crimeRepository)
        {
            _repo = _crimeRepository;
        }
        public async Task<CreateCrimeResponse> Handle(CreateCrimeRequest request)
        {
            var crime = new Crime()
            {
                Type = new() { Title = request.CrimeTypeTitle },
                Location = request.Location,
                CreateAt = DateTime.Now.ToUniversalTime(),
                CrimeDate = DateTime.SpecifyKind(request.CrimeDate, DateTimeKind.Utc),
                WantedPerson = new() { Name = request.WantedPersonName, Surname = request.WantedPersonSurname, BirthDate = DateTime.SpecifyKind(request.WantedPersonBirthDate, DateTimeKind.Utc) },
                Point = new() { Latitude = request.PointLatitude, Longitude = request.PointLongitude },
            };
            await _repo.CreateCrime(crime);

            return new CreateCrimeResponse(crime.Id, "Crime report successfully created.");
        }
    }
}
