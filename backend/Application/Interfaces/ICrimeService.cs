using Domain.Entities;

namespace Application.Interfaces
{
    public interface ICrimeService
    {
        Task<Crime> CreateCrime(Crime crime);
        IEnumerable<Crime> GetAllCrimes();
    }
}
