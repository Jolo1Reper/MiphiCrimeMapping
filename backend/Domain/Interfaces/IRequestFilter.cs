using Domain.Models;

namespace Domain.Interfaces
{
    public interface IRequestFilter<T>
    {
        IQueryable<T> Apply(IQueryable<T> query, CrimeFilterRequest filterRequest);
    }
}
