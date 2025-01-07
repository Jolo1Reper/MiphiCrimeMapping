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

        public async Task<bool> Handle(Guid id)
        {
            return await _repo.DeleteCrime(id);
        }
    }
}
