namespace Application.UseCases.CreateWantedPerson
{
    public record CreateWantedPersonRequest(string Name, string Surname, DateTime BirthDate);
}
