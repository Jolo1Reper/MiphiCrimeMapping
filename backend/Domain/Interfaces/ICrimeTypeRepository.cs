using Domain.Entities;

namespace Domain.Interfaces
{
    public interface ICrimeTypeRepository
    {
        Task<IEnumerable<CrimeType>> GetAllCrimeTypes();
        bool ContainCrimeType(Guid id);
        bool ContainCrimeType(string title);
        Task<CrimeType?> GetCrimeTypeById(Guid id);
        Task AddCrimeType(CrimeType type);
        Task UpdateCrimeType(CrimeType type);
        Task<bool> DeleteCrimeType(Guid id);
        Task<IEnumerable<(CrimeType CrimeType, int CrimeCount)>> GetAllCrimeTypesWithCountAndFilters(string? search, int page, int pageSize);
        Task<int> GetCrimeTypesCount(string? search);
    }
}
