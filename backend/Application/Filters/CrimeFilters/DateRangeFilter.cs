using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;

namespace Application.Filters.CrimeFilters
{
    public class DateRangeFilter : IRequestFilter<Crime>
    {
        public IQueryable<Crime> Apply(IQueryable<Crime> query, CrimeFilterRequest filterRequest)
        {
            if (filterRequest.StartDate is null && filterRequest.EndDate is null) return query;

            if (filterRequest.StartDate is DateTime)
                query = query.Where(c => c.CrimeDate >= filterRequest.StartDate);

            if (filterRequest.EndDate is DateTime)
                query = query.Where(c => c.CrimeDate <= filterRequest.EndDate);

            return query;
        }
    }
}
