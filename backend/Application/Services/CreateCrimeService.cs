using Application.Services.Interfaces;
using Application.UseCases.CreateCrime;
using Domain.Entities;
using Domain.Interfaces;
using NetTopologySuite.Geometries;

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
                    Description = request.Description,
                    Point = new Point(request.PointLongitude, request.PointLatitude) { SRID = 4326 }
                };
            }
            else if (request.WantedPersonName is not null && request.WantedPersonSurname is not null && request.WantedPersonBirthDate is not null)
            {
                return new Crime()
                {
                    TypeId = request.CrimeTypeId,
                    Location = request.Location,
                    CreateAt = DateTime.Now.ToUniversalTime(),
                    CrimeDate = DateTime.SpecifyKind(request.CrimeDate, DateTimeKind.Utc),
                    WantedPersonId = await GetWantedPersonId(
                        request.WantedPersonName, request.WantedPersonSurname, request.WantedPersonPatronymic,
                        DateTime.SpecifyKind(request.WantedPersonBirthDate.Value, DateTimeKind.Utc)),
                    Description = request.Description,
                    Point = new Point(request.PointLongitude, request.PointLatitude) { SRID = 4326 }
                };
            }
            else if (request.WantedPersonId is null && request.WantedPersonName is null && request.WantedPersonSurname is null)
            {
                return new Crime()
                {
                    TypeId = request.CrimeTypeId,
                    Location = request.Location,
                    CreateAt = DateTime.Now.ToUniversalTime(),
                    CrimeDate = DateTime.SpecifyKind(request.CrimeDate, DateTimeKind.Utc),
                    WantedPersonId = null,
                    Description = request.Description,
                    Point = new Point(request.PointLongitude, request.PointLatitude) { SRID = 4326 }
                };
            }
            else
            {
                return null;
            }
        }

        private async Task<Guid> GetWantedPersonId(string name, string surname, string? patronymic, DateTime birthDate)
        {
            if (!_wantedPersonRepository.ContainWantedPerson(name, surname, patronymic, birthDate))
            {
                WantedPerson person = new() { Name = name, Surname = surname, Patronymic = patronymic, BirthDate = birthDate };
                await _wantedPersonRepository.AddWantedPerson(person);
            }
            return await _wantedPersonRepository.GetWantedPersonIdByData(name, surname, patronymic, birthDate);
        }
    }
}
