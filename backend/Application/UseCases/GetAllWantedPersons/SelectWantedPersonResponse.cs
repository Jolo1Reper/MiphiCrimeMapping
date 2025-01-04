namespace Application.UseCases.GetAllWantedPersons
{
    public record SelectWantedPersonResponse(Guid Id, string Name, string Surname, DateTime BirthDate);
}
