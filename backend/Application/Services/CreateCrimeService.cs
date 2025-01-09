using Application.Services.Interfaces;
using Application.UseCases.CreateCrime;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services
{
    public class CreateCrimeService : ICreateCrimeService
    {
        private readonly ICrimeTypeRepository _crimeTypeRepository;
        private readonly IWantedPersonRepository _wantedPersonRepository;
        public CreateCrimeService(ICrimeTypeRepository crimeTypeRepository, IWantedPersonRepository wantedPersonRepository)
        {
            _crimeTypeRepository = crimeTypeRepository;
            _wantedPersonRepository = wantedPersonRepository;
        }
        public async Task<Crime?> CreateCrime(CreateCrimeRequest request)
        {
            if (!_crimeTypeRepository.ContainCrimeType(request.CrimeTypeId))
            {
                return null;
            }
            if (request.WantedPersonId is Guid id)
            {
                return new Crime()
                {
                    TypeId = request.CrimeTypeId,
                    Location = request.Location,
                    CreateAt = DateTime.Now.ToUniversalTime(),
                    CrimeDate = DateTime.SpecifyKind(request.CrimeDate, DateTimeKind.Utc),
                    WantedPersonId = id,
                    Point = new() { Latitude = request.PointLatitude, Longitude = request.PointLongitude },
                };
            }
            else if (request.WantedPersonName is not null && request.WantedPersonSurname is not null)
            {
                return new Crime()
                {
                    TypeId = request.CrimeTypeId,
                    Location = request.Location,
                    CreateAt = DateTime.Now.ToUniversalTime(),
                    CrimeDate = DateTime.SpecifyKind(request.CrimeDate, DateTimeKind.Utc),
                    WantedPersonId = await GetWantedPersonId(request.WantedPersonName, request.WantedPersonSurname, DateTime.SpecifyKind(request.WantedPersonBirthDate, DateTimeKind.Utc)),
                    Point = new() { Latitude = request.PointLatitude, Longitude = request.PointLongitude },
                };
            }
            else
            {
                return null;
            }
        }

        private async Task<Guid> GetWantedPersonId(string name, string surname, DateTime birthDate)
        {
            if (!_wantedPersonRepository.ContainWantedPerson(name, surname, birthDate))
            {
                WantedPerson person = new() { Name = name, Surname = surname, BirthDate = birthDate };
                await _wantedPersonRepository.AddWantedPerson(person);
            }
            return await _wantedPersonRepository.GetWantedPersonIdByData(name, surname, birthDate);
        }
    }
}
