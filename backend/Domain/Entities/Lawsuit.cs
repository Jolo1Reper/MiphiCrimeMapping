namespace Domain.Entities
{
    public class Lawsuit : BaseEntity
    {
        public string Number { get; set; } = string.Empty;
        public DateTime ReceiptDate { get; set; }
        public WantedPerson Person { get; set; } = null!;
        public string Judge { get; set; } = string.Empty;
        public DateTime DecisionDate { get; set; }
        public string Decision { get; set; } = string.Empty;
        public DateTime EffectiveDate { get; set; }
        public string JudicialActs { get; set; } = string.Empty;

    }
}
