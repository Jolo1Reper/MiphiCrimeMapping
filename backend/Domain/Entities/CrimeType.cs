namespace Domain.Entities
{
    public class CrimeType : BaseEntity
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Link { get; set; }
        public List<Crime> Crimes { get; set; } = new List<Crime>();
    }
}
