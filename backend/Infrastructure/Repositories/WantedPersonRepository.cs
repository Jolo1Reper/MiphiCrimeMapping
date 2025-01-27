using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class WantedPersonRepository : IWantedPersonRepository
    {
        private readonly AppCrimeMapContext _db;
        private readonly ISearchFilter<WantedPerson> _filter;
        public WantedPersonRepository(AppCrimeMapContext db, ISearchFilter<WantedPerson> filter)
        {
            _db = db;
            _filter = filter;
        }

        public async Task<IEnumerable<WantedPerson>> GetAllWantedPersons()
        {
            return await _db.WantedPersons
                .AsNoTracking()
                .OrderBy(p => p.Surname)
                .ThenBy(p => p.Name)
                .ThenBy(p => p.Patronymic)
                .ToListAsync();
        }

        public bool ContainWantedPerson(string name, string surname, string? patronymic, DateTime birthDate)
        {
            if(patronymic is null)
            {
                return _db.WantedPersons.Any(
                    p => p.Name == name && p.Surname == surname && p.BirthDate == birthDate);
            }
            else
            {
                return _db.WantedPersons.Any(
                    p => p.Name == name && p.Surname == surname && p.BirthDate == birthDate && p.Patronymic == patronymic);
            }
        }

        public async Task AddWantedPerson(WantedPerson person)
        {
            await _db.WantedPersons.AddAsync(person);
            await _db.SaveChangesAsync();
        }

        public async Task<Guid> GetWantedPersonIdByData(string name, string surname, string? patronymic, DateTime birthDate)
        {
            var person = await _db.WantedPersons.FirstOrDefaultAsync(
                p => p.Name == name && p.Surname == surname && p.Patronymic == patronymic && p.BirthDate == birthDate);
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

        public async Task<IEnumerable<(WantedPerson WantedPerson, int CrimeCount)>> GetAllWantedPersonsWithCountAndFilters(string? search, int page, int pageSize)
        {
            IQueryable<WantedPerson> query = _db.Set<WantedPerson>();
            if(search != null)
                query = _filter.Apply(query, search);

            var result = await query
                .Include(p => p.Crimes)
                .OrderBy(p => p.Surname)
                .ThenBy(p => p.Name)
                .ThenBy(p => p.Patronymic)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(wantedPerson => new ValueTuple<WantedPerson, int>(wantedPerson, wantedPerson.Crimes.Count))
                .ToListAsync();

            return result;
        }

        public async Task<int> GetWantedPersonsCount(string? search)
        {
            IQueryable<WantedPerson> query = _db.Set<WantedPerson>();
            if (search != null)
                query = _filter.Apply(query, search);

            return await query.CountAsync();
        }
    }
}
