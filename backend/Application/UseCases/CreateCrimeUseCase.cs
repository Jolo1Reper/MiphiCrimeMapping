using Application.DTOs.Requests;
using Application.DTOs.Responses;
using Application.Services.Interfaces;
using Application.UseCases.Interfaces;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.UseCases
{
    public class CreateCrimeUseCase : ICreateCrimeUseCase
    {
        private readonly ICrimeReportRepository _repo;
        private readonly ICreateCrimeService _createCrimeService;
        public CreateCrimeUseCase(ICrimeReportRepository _crimeRepository, ICreateCrimeService createCrimeService)
        {
            _repo = _crimeRepository;
            _createCrimeService = createCrimeService;
        }

        public async Task<CreateCrimeResponse?> Handle(CreateCrimeRequest request)
        {
            Crime? crime = await _createCrimeService.CreateCrime(request);

            if (crime is null)
            {
                return null;
            }

            await _repo.CreateCrime(crime);
            return new CreateCrimeResponse(crime.Id, "Crime report successfully created.");
        }
    }
}
