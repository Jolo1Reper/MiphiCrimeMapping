namespace Application.DTOs.Responses
{
    public record GetWantedPersonResponse(Guid Id, string Naame, string Surname, DateTime BirthDate);
}
