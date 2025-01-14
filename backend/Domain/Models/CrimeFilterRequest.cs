namespace Domain.Models
{
    public class CrimeFilterRequest
    {
        public string? SearchQuery { get; set; }
        public Guid? CrimeTypeId { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public double? Radius { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
