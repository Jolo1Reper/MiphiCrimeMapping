using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;

namespace Application.Filters.CrimeFilters
{
    public class SelectCrimesByMultipleTypesFilter : IRequestFilter<Crime>
    {
        public IQueryable<Crime> Apply(IQueryable<Crime> query, CrimeFilterRequest filterRequest)
        {
            var crimeTypeIds = filterRequest.CrimeTypeIds;
            if (crimeTypeIds == null || !crimeTypeIds.Any()) return query;

            return query.Where(c => crimeTypeIds.Contains(c.TypeId));
        }
    }
}
