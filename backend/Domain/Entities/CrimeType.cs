namespace Domain.Entities
{
    public class CrimeType : BaseEntity
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
    }
}
