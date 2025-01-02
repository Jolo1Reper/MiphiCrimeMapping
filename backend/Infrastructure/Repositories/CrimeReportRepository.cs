using Domain.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Numerics;

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
            await _db.Crimes.AddAsync(crime);
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

            if (_db.Entry(data).State == EntityState.Detached)
            {
                _db.Crimes.Attach(data);
            }

            _db.Crimes.Update(data);
            await _db.SaveChangesAsync();

            Crime? updatePlayer = await GetCrimeById(data.Id);
        }

        public async Task DeleteCrime(Guid id)
        {
            var crime = await _db.Crimes.FirstOrDefaultAsync(c => c.Id == id);
            if (crime is not null)
            {
                _db.Crimes.Remove(crime);
                await _db.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<CrimeType>> GetAllCrimeTypes()
        {
            return await _db.CrimeTypes.AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<WantedPerson>> GetAllWantedPersons()
        {
            return await _db.WantedPersons.AsNoTracking().ToListAsync();
        }

        public bool ContainWantedPerson(string name, string surname, DateTime birthDate)
        {
            return _db.WantedPersons.Any(p => p.Name == name && p.Surname == surname && p.BirthDate == birthDate);
        }

        public async Task AddWantedPerson(WantedPerson person)
        {
            await _db.AddAsync(person);
            await _db.SaveChangesAsync();
        }

        public async Task<Guid> GetWantedPersonIdByData(string name, string surname, DateTime birthDate)
        {
            var person = await _db.WantedPersons.FirstOrDefaultAsync(p => p.Name == name && p.Surname == surname && p.BirthDate == birthDate);
            if (person is not null)
            {
                return person.Id;
            }
            else
            {
                throw new Exception("Not wanted person with data");
            }
        }

        public bool ContainCrimeType(Guid id)
        {
            return _db.CrimeTypes.Any(c => c.Id == id);
        }

        public async Task<CrimeType?> GetCrimeTypeById(Guid id)
        {
            CrimeType? crimeType = await _db.CrimeTypes.FirstOrDefaultAsync(t => t.Id == id);
            return crimeType;
        }
    }
}
