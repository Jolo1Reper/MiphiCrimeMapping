using Domain.Entities;
using Domain.Models;

namespace Domain.Interfaces
{
    public interface ICrimeMarkRepository
    {
        Task AddCrime(Crime crime);
        Task<Crime?> GetCrimeById(Guid id);
        Task<IEnumerable<Crime>> GetFilteredCrimes(CrimeFilterRequest filter);
        Task UpdateCrime(Guid id, Crime data);
        Task<bool> DeleteCrime(Guid id);
    }
}