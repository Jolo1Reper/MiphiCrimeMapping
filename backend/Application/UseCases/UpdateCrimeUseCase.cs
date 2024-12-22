using Application.DTOs.Requests;
using Application.DTOs.Responses;
using Application.UseCases.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UseCases
{
    public class UpdateCrimeUseCase : IUpdateCrimeUseCase
    {
        private ICrimeReportRepository _repo;
        public UpdateCrimeUseCase(ICrimeReportRepository _crimeRepository)
        {
            _repo = _crimeRepository;
        }
        public async Task<UpdateCrimeResponse> Handle(UpdateCrimeRequest request)
        {
            var crime = new Crime()
            {
                Type = new() { Title = request.CrimeTypeTitle },
                Location = request.Location,
                CrimeDate = request.CrimeDate,
                WantedPerson = new() { Name = request.WantedPersonName, Surname = request.WantedPersonSurname, BirthDate = DateTime.SpecifyKind(request.WantedPersonBirthDate, DateTimeKind.Utc) },
                Point = new() { Latitude = request.PointLatitude, Longitude = request.PointLongitude },
            };
            await _repo.UpdateCrime(request.Id, crime);

            return new UpdateCrimeResponse(crime.Id, "Crime report successfully edited.");
        }
    }
}
