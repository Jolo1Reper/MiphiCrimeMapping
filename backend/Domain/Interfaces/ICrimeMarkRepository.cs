using Domain.Entities;

namespace Domain.Interfaces
{
    public interface ICrimeMarkRepository
    {
        Task AddCrime(Crime crime);
        Task<Crime?> GetCrimeById(Guid id);
        Task<IEnumerable<Crime>> GetAllCrimes();
        Task UpdateCrime(Guid id, Crime data);
        Task<bool> DeleteCrime(Guid id);
    }
}