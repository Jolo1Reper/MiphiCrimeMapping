using Domain.Entities;

namespace Domain.Interfaces
{
    public interface ICrimeReportRepository
    {
        Task CreateCrime(Crime crime);
        Task<Crime?> GetCrimeById(Guid id);
        Task<IEnumerable<Crime>> GetAllCrimes();
        Task UpdateCrime(Guid id, Crime data);
    }
}