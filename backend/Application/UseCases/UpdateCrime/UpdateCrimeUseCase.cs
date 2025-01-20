using Application.Services.Interfaces;
using Application.UseCases.CreateCrime;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.UseCases.UpdateCrime
{
    public class UpdateCrimeUseCase : IUpdateCrimeUseCase
    {
        private readonly ICrimeMarkRepository _markRepository;
        private readonly ICreateCrimeService _createCrimeService;
        private readonly ICrimeTypeRepository _typeRepository;  
        public UpdateCrimeUseCase(ICrimeMarkRepository markRepository, ICrimeTypeRepository typeRepository, ICreateCrimeService createCrimeService)
        {
            _markRepository = markRepository;
            _createCrimeService = createCrimeService;
            _typeRepository = typeRepository;
        }

        public async Task<CrimeReportResponse?> Handle(UpdateCrimeRequest request)
        {
            if(!_typeRepository.ContainCrimeType(request.CrimeTypeId))
                return null;

            CreateCrimeRequest createRequest = new CreateCrimeRequest(
                request.CrimeTypeId, request.WantedPersonId, 
                request.WantedPersonName, request.WantedPersonSurname, request.WantedPersonPatronymic, request.WantedPersonBirthDate,
                request.CrimeDate, request.Location, request.Description, request.PointLatitude, request.PointLongitude
            );

            Crime? crime = await _createCrimeService.CreateCrime(createRequest); ;

            if (crime is null)
            {
                return null;
            }

            crime.Id = request.Id;

            await _markRepository.UpdateCrime(request.Id, crime);

            return new CrimeReportResponse(crime.Id, "Crime report successfully edited.");
        }
    }
}
