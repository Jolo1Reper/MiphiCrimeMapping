using Domain.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Numerics;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Infrastructure.Repositories
{
    public class CrimeReportRepository : ICrimeReportRepository
    {
        private AppCrimeMapContext _db;
        public CrimeReportRepository(AppCrimeMapContext db) 
        {
            _db = db;
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
            await _db.WantedPersons.AddAsync(person);
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

        public async Task<WantedPerson?> GetWantedPersonById(Guid id)
        {
            var person = await _db.WantedPersons.FirstOrDefaultAsync(p => p.Id == id);
            return person;
        }

        public async Task UpdateWantedPerson(WantedPerson person)
        {
            if (_db.Entry(person).State == EntityState.Detached)
            {
                _db.WantedPersons.Attach(person);
            }

            _db.WantedPersons.Update(person);
            await _db.SaveChangesAsync();
        }

        public async Task<bool> DeleteWantedPerson(Guid id)
        {
            var person = await _db.WantedPersons.FirstOrDefaultAsync(p => p.Id == id);
            if (person is null)
                return false;

            _db.WantedPersons.Remove(person);
            await _db.SaveChangesAsync();
            return true;
        }

        public bool ContainCrimeType(Guid id)
        {
            return _db.CrimeTypes.Any(c => c.Id == id);
        }

        public bool ContainCrimeType(string title)
        {
            return _db.CrimeTypes.Any(c => c.Title == title);
        }

        public async Task<CrimeType?> GetCrimeTypeById(Guid id)
        {
            CrimeType? crimeType = await _db.CrimeTypes.FirstOrDefaultAsync(t => t.Id == id);
            return crimeType;
        }

        public async Task AddCrimeType(CrimeType type)
        {
            await _db.CrimeTypes.AddAsync(type);
            await _db.SaveChangesAsync();
        }

        public async Task UpdateCrimeType(CrimeType type)
        {
            if (_db.Entry(type).State == EntityState.Detached)
            {
                _db.CrimeTypes.Attach(type);
            }

            _db.CrimeTypes.Update(type);
            await _db.SaveChangesAsync();
        }
        public async Task<bool> DeleteCrimeType(Guid id)
        {
            var crimeType = await _db.CrimeTypes.FirstOrDefaultAsync(t => t.Id == id);
            if (crimeType is null)
                return false;

            _db.CrimeTypes.Remove(crimeType);
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
