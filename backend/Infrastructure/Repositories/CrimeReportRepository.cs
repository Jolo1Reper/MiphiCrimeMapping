using Domain.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class CrimeReportRepository : ICrimeReportRepository
    {
        private AppCrimeMapContext _db;
        public CrimeReportRepository(AppCrimeMapContext db) 
        {
            _db = db;
        }

        public async Task CreateCrime(Crime crime)
        {
            _db.Crimes.Add(crime);
            await _db.SaveChangesAsync();
        }

        public async Task<Crime?> GetCrimeById(Guid id)
        {
            Crime? crime = await _db.Crimes.Include(c => c.WantedPerson).Include(c => c.Type).Include(c => c.Lawsuit).FirstOrDefaultAsync(c => c.Id == id);
            return crime;
        }

        public async Task<IEnumerable<Crime>> GetAllCrimes()
        {
            IEnumerable<Crime> crimes = await _db.Crimes.Include(c => c.Type).Include(c => c.WantedPerson).AsNoTracking().ToListAsync();
            return crimes;
        }

        public async Task UpdateCrime(Guid id, Crime data)
        {
            Crime? crime = await _db.Crimes.Include(c => c.WantedPerson).Include(c => c.Type).Include(c => c.Lawsuit).FirstOrDefaultAsync(c => c.Id == id);
            if (crime == null)
            {
                return;
            }

            crime.Type.Title = data.Type.Title;
            crime.Location = data.Location;
            crime.CrimeDate = data.CrimeDate;
            crime.WantedPerson = data.WantedPerson;
            crime.Point = data.Point;

            await _db.SaveChangesAsync();
        }
    }
}
