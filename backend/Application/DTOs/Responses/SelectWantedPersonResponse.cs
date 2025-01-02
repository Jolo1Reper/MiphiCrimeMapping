namespace Application.DTOs.Responses
{
    public record SelectWantedPersonResponse(Guid Id, string Name, string Surname, DateTime BirthDate);
}
