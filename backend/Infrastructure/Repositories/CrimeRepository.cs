using Application.Interfaces;
using Infrastructure.Data;

namespace Infrastructure.Repositories
{
    public class CrimeRepository : ICrimeRepository
    {
        AppCrimeMapContext _db;
        public CrimeRepository(AppCrimeMapContext db) 
        {
            _db = db;
        }
    }
}
