namespace Application.UseCases.GetWantedPerson
{
    public record GetWantedPersonResponse(Guid Id, string Name, string Surname, DateTime BirthDate);
}
