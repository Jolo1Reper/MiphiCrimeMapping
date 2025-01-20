using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;

namespace Application.Filters.CrimeFilters
{
    public class CrimeTypeFilter : IRequestFilter<Crime>
    {
        public IQueryable<Crime> Apply(IQueryable<Crime> query, CrimeFilterRequest filterRequest)
        {
            var crimeTypeId = filterRequest.CrimeTypeId;
            if (crimeTypeId is not Guid) return query;

            return query.Where(c => c.TypeId == crimeTypeId);
        }
    }
}
