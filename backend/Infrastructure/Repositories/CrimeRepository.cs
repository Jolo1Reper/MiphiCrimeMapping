using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class CrimeRepository : ICrimeRepository
    {
        AppCrimeMapContext _db;
        public CrimeRepository(AppCrimeMapContext db) 
        {
            _db = db;
        }

        public async Task CreateCrime(Crime crime)
        {
            _db.Crimes.Add(crime);
            await _db.SaveChangesAsync();
        }

        public IEnumerable<Crime> GetAllCrimes()
        {
            IEnumerable<Crime> crimes = _db.Crimes.Include(c => c.Type).Include(c => c.WantedPerson).AsNoTracking().ToList();
            return crimes;
        }
    }
}
