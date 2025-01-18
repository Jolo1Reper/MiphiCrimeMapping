using Domain.Models;

namespace Domain.Interfaces
{
    public interface IFilter<T>
    {
        IQueryable<T> Apply(IQueryable<T> query, CrimeFilterRequest filterRequest);
    }
}
