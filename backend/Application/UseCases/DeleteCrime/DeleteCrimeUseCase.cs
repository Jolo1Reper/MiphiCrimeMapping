using Domain.Interfaces;

namespace Application.UseCases.DeleteCrime
{
    public class DeleteCrimeUseCase : IDeleteCrimeUseCase
    {
        private ICrimeMarkRepository _repo;

        public DeleteCrimeUseCase(ICrimeMarkRepository crimeRepository)
        {
            _repo = crimeRepository;
        }

        public async Task<bool> Handle(Guid id)
        {
            return await _repo.DeleteCrime(id);
        }
    }
}
