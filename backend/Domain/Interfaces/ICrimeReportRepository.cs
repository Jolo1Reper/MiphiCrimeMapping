using Domain.Entities;

namespace Domain.Interfaces
{
    public interface ICrimeReportRepository
    {
        Task CreateCrime(Crime crime);
        Task<Crime?> GetCrimeById(Guid id);
        Task<IEnumerable<Crime>> GetAllCrimes();
        Task UpdateCrime(Guid id, Crime data);
        Task DeleteCrime(Guid id);
        Task<IEnumerable<CrimeType>> GetAllCrimeTypes();
        Task<IEnumerable<WantedPerson>> GetAllWantedPersons();
        bool ContainWantedPerson(string name, string surname, DateTime birthDate);
        Task AddWantedPerson(WantedPerson person);
        Task<Guid> GetWantedPersonIdByData(string name, string surname, DateTime birthDate);
        bool ContainCrimeType(Guid id);
        Task<CrimeType?> GetCrimeTypeById(Guid id);
        Task<WantedPerson?> GetWantedPersonById(Guid id);
    }
}