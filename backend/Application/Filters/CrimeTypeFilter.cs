using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;

namespace Application.Filters
{
    public class CrimeTypeFilter : IFilter<Crime>
    {
        public IQueryable<Crime> Apply(IQueryable<Crime> query, CrimeFilterRequest filterRequest)
        {
            var crimeTypeId = filterRequest.CrimeTypeId;
            if (crimeTypeId is not Guid) return query;

            return query.Where(c => c.TypeId == crimeTypeId);
        }
    }
}
