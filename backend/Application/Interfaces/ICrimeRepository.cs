using Domain.Entities;

namespace Application.Interfaces
{
    public interface ICrimeRepository
    {
        Task CreateCrime(Crime crime);
        IEnumerable<Crime> GetAllCrimes();
    }
}