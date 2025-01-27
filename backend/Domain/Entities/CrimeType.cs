namespace Domain.Entities
{
    public class CrimeType : BaseEntity
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Link { get; set; }
        public string Color { get; set; } = null!;
        public List<Crime> Crimes { get; set; } = new List<Crime>();
        public DateTime CreateAt { get; set; } = DateTime.Now.ToUniversalTime();
    }
}
