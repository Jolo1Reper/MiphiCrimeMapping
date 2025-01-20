using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;

namespace Application.Filters.CrimeFilters
{
    public class SearchQueryFilter : IRequestFilter<Crime>
    {
        public IQueryable<Crime> Apply(IQueryable<Crime> query, CrimeFilterRequest filterRequest)
        {
            var searchQuery = filterRequest.SearchQuery?.ToLower().Trim();

            if (string.IsNullOrEmpty(searchQuery)) return query;

            return query.Where(c =>
                c.Location != null && c.Location.ToLower().Contains(searchQuery) ||
                c.Type.Title.ToLower().Contains(searchQuery) ||
                c.Description != null && c.Description.ToLower().Contains(searchQuery));
        }
    }
}
