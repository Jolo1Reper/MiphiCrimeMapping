using Application.Services.Interfaces;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.UseCases.CreateCrime
{
    public class CreateCrimeUseCase : ICreateCrimeUseCase
    {
        private readonly ICrimeMarkRepository _repo;
        private readonly ICreateCrimeService _createCrimeService;
        public CreateCrimeUseCase(ICrimeMarkRepository _crimeRepository, ICreateCrimeService createCrimeService)
        {
            _repo = _crimeRepository;
            _createCrimeService = createCrimeService;
        }

        public async Task<CrimeReportResponse?> Handle(CreateCrimeRequest request)
        {
            Crime? crime = await _createCrimeService.CreateCrime(request);

            if (crime is null)
            {
                return null;
            }

            await _repo.AddCrime(crime);
            return new CrimeReportResponse(crime.Id, "Crime report successfully created.");
        }
    }
}
