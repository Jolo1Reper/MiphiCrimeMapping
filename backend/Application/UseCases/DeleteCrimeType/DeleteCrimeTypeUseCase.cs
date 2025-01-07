using Domain.Interfaces;

namespace Application.UseCases.DeleteCrimeType
{
    public class DeleteCrimeTypeUseCase : IDeleteCrimeTypeUseCase
    {
        private ICrimeReportRepository _repo;

        public DeleteCrimeTypeUseCase(ICrimeReportRepository crimeRepository)
        {
            _repo = crimeRepository;
        }
        public async Task<bool> Handle(Guid id)
        {
            return await _repo.DeleteCrimeType(id);
        }
    }
}
