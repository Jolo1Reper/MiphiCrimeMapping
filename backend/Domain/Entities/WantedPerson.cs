namespace Domain.Entities
{
    public class WantedPerson : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string? Patronymic { get; set; }
        public DateTime BirthDate { get; set; }
        public string? RegistrationAddress { get; set; }
        public string? AddInfo { get; set; }
        public List<Crime> Crimes { get; set; } = new List<Crime>();
        public DateTime CreateAt { get; set; } = DateTime.Now.ToUniversalTime();
    }
}
