using Application.DTOs.Requests;
using Application.DTOs.Responses;
using Application.Services.Interfaces;
using Application.UseCases.Interfaces;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.UseCases
{
    public class UpdateCrimeUseCase : IUpdateCrimeUseCase
    {
        private readonly ICrimeReportRepository _repo;
        private readonly ICreateCrimeService _createCrimeService;
        public UpdateCrimeUseCase(ICrimeReportRepository repository, ICreateCrimeService createCrimeService)
        {
            _repo = repository;
            _createCrimeService = createCrimeService;
        }
        public async Task<UpdateCrimeResponse?> Handle(UpdateCrimeRequest request)
        {
            CreateCrimeRequest createRequest = new CreateCrimeRequest(
                request.CrimeTypeId, 
                request.WantedPersonId, request.WantedPersonName, request.WantedPersonSurname,request.WantedPersonBirthDate, 
                request.CrimeDate, request.Location, request.PointLatitude, request.PointLongitude
            );

            Crime? crime = await _createCrimeService.CreateCrime(createRequest); ;

            if (crime is null)
            {
                return null;
            }

            crime.Id = request.Id;

            await _repo.UpdateCrime(request.Id, crime);

            return new UpdateCrimeResponse(crime.Id, "Crime report successfully edited.");
        }
    }
}
