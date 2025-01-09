namespace Application.UseCases.SelectAllWantedPersons
{
    public record SelectAllWantedPersonResponse(Guid Id, string Name, string Surname, DateTime BirthDate);
}
