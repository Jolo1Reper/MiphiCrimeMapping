using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IWantedPersonRepository
    {
        Task<IEnumerable<WantedPerson>> GetAllWantedPersons();
        bool ContainWantedPerson(string name, string surname, string? patronymic, DateTime birthDate);
        Task AddWantedPerson(WantedPerson person);
        Task<Guid> GetWantedPersonIdByData(string name, string surname, string? patronymic, DateTime birthDate);
        Task<WantedPerson?> GetWantedPersonById(Guid id);
        Task UpdateWantedPerson(WantedPerson person);
        Task<bool> DeleteWantedPerson(Guid id);
        Task<IEnumerable<(WantedPerson WantedPerson, int CrimeCount)>> GetAllWantedPersonsWithCountAndFilters(string? search, int page, int pageSize);
        Task<int> GetWantedPersonsCount(string? search);
    }
}
