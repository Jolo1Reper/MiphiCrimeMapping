using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;

namespace Application.Filters.CrimeFilters
{
    public class SelectCrimesByMultiplePersonsFilter : IRequestFilter<Crime>
    {
        public IQueryable<Crime> Apply(IQueryable<Crime> query, CrimeFilterRequest filterRequest)
        {
            var wantedPersonIds = filterRequest.WantedPersonIds;
            if (wantedPersonIds == null || !wantedPersonIds.Any()) return query;

            Guid nullId = new Guid("00000000-0000-0000-0000-000000000000");
            if(wantedPersonIds.Contains(nullId))
            {
                return query.Where(c => c.WantedPersonId == null || wantedPersonIds.Contains(c.WantedPersonId.Value));
            }

            return query.Where(c => c.WantedPersonId != null && wantedPersonIds.Contains(c.WantedPersonId.Value));
        }
    }
}
