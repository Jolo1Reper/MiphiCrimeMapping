using Domain.Entities;
using Domain.Interfaces;

namespace Application.Filters.WantedPersonFilters
{
    public class WantedPersonsSearchFilter : ISearchFilter<WantedPerson>
    {
        public IQueryable<WantedPerson> Apply(IQueryable<WantedPerson> query, string searchQuery)
        {
            if (string.IsNullOrEmpty(searchQuery))
            {
                return query;
            }

            var normalizedSearchQuery = searchQuery.ToLower().Trim();

            return query.Where(person =>
                person.Name.ToLower().Contains(normalizedSearchQuery) ||
                person.Surname.ToLower().Contains(normalizedSearchQuery) ||
                (person.Patronymic != null && person.Patronymic.ToLower().Contains(normalizedSearchQuery))
            );
        }
    }
}
