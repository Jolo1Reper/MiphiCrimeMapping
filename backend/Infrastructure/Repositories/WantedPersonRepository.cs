using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class WantedPersonRepository : IWantedPersonRepository
    {
        private readonly AppCrimeMapContext _db;
        public WantedPersonRepository(AppCrimeMapContext db)
        {
            _db = db;
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

        public async Task<IEnumerable<(WantedPerson WantedPerson, int CrimeCount)>> GetAllWantedPersonsWithCounts()
        {
            var result = await _db.WantedPersons
            .Include(ct => ct.Crimes)
            .Select(wantedPerson => new ValueTuple<WantedPerson, int>(wantedPerson, wantedPerson.Crimes.Count))
            .ToListAsync();

            return result;
        }
    }
}
