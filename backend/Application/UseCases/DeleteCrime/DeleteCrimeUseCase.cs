using Domain.Interfaces;

namespace Application.UseCases.DeleteCrime
{
    public class DeleteCrimeUseCase : IDeleteCrimeUseCase
    {
        private ICrimeReportRepository _repo;

        public DeleteCrimeUseCase(ICrimeReportRepository crimeRepository)
        {
            _repo = crimeRepository;
        }

        public async Task Handle(Guid id)
        {
            await _repo.DeleteCrime(id);
        }
    }
}
