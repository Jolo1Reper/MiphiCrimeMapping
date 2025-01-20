namespace Application.Pagination
{
    public class PaginationSearchParameters
    {
        public string? SearchQuery { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 8;
    }
}
