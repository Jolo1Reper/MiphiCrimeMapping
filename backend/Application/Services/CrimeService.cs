using Application.Interfaces;
using Domain.Entities;

namespace Application.Services
{
    public class CrimeService : ICrimeService
    {
        ICrimeRepository _repo;
        public CrimeService(ICrimeRepository repository) 
        {
            _repo = repository;
        }
        public async Task<Crime> CreateCrime(Crime crime)
        {
            await _repo.CreateCrime(crime);
            return crime;
        }

        public IEnumerable<Crime> GetAllCrimes()
        {
            return _repo.GetAllCrimes();
        }
    }
}
