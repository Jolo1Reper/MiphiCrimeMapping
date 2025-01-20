using Domain.Entities;
using Domain.Interfaces;

namespace Application.Filters.CrimeTypeFilters
{
    public class CrimeTypesSearchFilter : ISearchFilter<CrimeType>
    {
        public IQueryable<CrimeType> Apply(IQueryable<CrimeType> query, string searchQuery)
        {
            if (string.IsNullOrEmpty(searchQuery))
            {
                return query;
            }

            var normalizedSearchQuery = searchQuery.ToLower().Trim();
            Console.WriteLine($"FFFFFFFFFFFFFFF:{normalizedSearchQuery}");
            return query.Where(type =>
                type.Title.ToLower().Contains(normalizedSearchQuery) ||
                (type.Description != null && type.Description.ToLower().Contains(normalizedSearchQuery))
            );
        }
    }
}
