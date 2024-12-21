namespace Domain.Entities
{
    public class Crime : BaseEntity
    {
        public string Applicant { get; set; } = string.Empty;
        public CrimeType Type { get; set; } = null!;
        public WantedPerson WantedPerson { get; set; } = null!;
        public string Location { get; set; } = string.Empty;
        public DateTime CreateDate { get; set; } = DateTime.Now;
        public Lawsuit? Lawsuit { get; set; }
        public Point Point { get; set; } = null!;
    }
}
