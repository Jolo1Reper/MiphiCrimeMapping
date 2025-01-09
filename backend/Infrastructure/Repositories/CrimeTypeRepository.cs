using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class CrimeTypeRepository : ICrimeTypeRepository
    {
        private readonly AppCrimeMapContext _db;
        public CrimeTypeRepository(AppCrimeMapContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<CrimeType>> GetAllCrimeTypes()
        {
            return await _db.CrimeTypes.AsNoTracking().ToListAsync();
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

        public async Task<IEnumerable<(CrimeType CrimeType, int CrimeCount)>> GetAllCrimeTypesWithCounts()
        {
            var result = await _db.CrimeTypes
                        .Include(ct => ct.Crimes)
                        .Select(crimeType => new ValueTuple<CrimeType, int>(crimeType, crimeType.Crimes.Count))
                        .ToListAsync();

            return result;
        }
    }
}
