using Domain.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Domain.Models;

namespace Infrastructure.Repositories
{
    public class CrimeMarkRepository : ICrimeMarkRepository
    {
        private readonly AppCrimeMapContext _db;
        private readonly IEnumerable<IRequestFilter<Crime>> _filters;
        public CrimeMarkRepository(AppCrimeMapContext db, IEnumerable<IRequestFilter<Crime>> filters) 
        {
            _db = db;
            _filters = filters;
        }

        public async Task AddCrime(Crime crime)
        {
            await _db.Crimes.AddAsync(crime);
            await _db.SaveChangesAsync();
        }

        public async Task<Crime?> GetCrimeById(Guid id)
        {
            Crime? crime = await _db.Crimes.Include(c => c.WantedPerson).Include(c => c.Type).Include(c => c.Lawsuit).FirstOrDefaultAsync(c => c.Id == id);
            return crime;
        }

        public async Task<IEnumerable<Crime>> GetFilteredCrimes(CrimeFilterRequest filterRequest)
        {
            IQueryable<Crime> query = _db.Set<Crime>();
            foreach (var filterHandler in _filters)
            {
                query = filterHandler.Apply(query, filterRequest);
            }

            return await query.ToListAsync();
        }

        public async Task UpdateCrime(Guid id, Crime data)
        {
            if (_db.Entry(data).State == EntityState.Detached)
            {
                _db.Crimes.Attach(data);
            }

            _db.Crimes.Update(data);
            await _db.SaveChangesAsync();
        }

        public async Task<bool> DeleteCrime(Guid id)
        {
            var crime = await _db.Crimes.FirstOrDefaultAsync(c => c.Id == id);
            if (crime is null)
                return false;

            _db.Crimes.Remove(crime);
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
