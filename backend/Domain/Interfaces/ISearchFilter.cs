namespace Domain.Interfaces
{
    public interface ISearchFilter<T>
    {
        IQueryable<T> Apply(IQueryable<T> query, string search);
    }
}
