using Domain.Entities;

namespace Domain.Interfaces
{
    public interface ICrimeReportRepository
    {
        Task AddCrime(Crime crime);
        Task<Crime?> GetCrimeById(Guid id);
        Task<IEnumerable<Crime>> GetAllCrimes();
        Task UpdateCrime(Guid id, Crime data);
        Task<bool> DeleteCrime(Guid id);

        Task<IEnumerable<WantedPerson>> GetAllWantedPersons();
        bool ContainWantedPerson(string name, string surname, DateTime birthDate);
        Task AddWantedPerson(WantedPerson person);
        Task<Guid> GetWantedPersonIdByData(string name, string surname, DateTime birthDate);
        Task<WantedPerson?> GetWantedPersonById(Guid id);
        Task UpdateWantedPerson(WantedPerson person);
        Task<bool> DeleteWantedPerson(Guid id);

        Task<IEnumerable<CrimeType>> GetAllCrimeTypes();
        bool ContainCrimeType(Guid id);
        bool ContainCrimeType(string title);
        Task<CrimeType?> GetCrimeTypeById(Guid id);
        Task AddCrimeType(CrimeType type);
        Task UpdateCrimeType(CrimeType type);
        Task<bool> DeleteCrimeType(Guid id);
    }
}