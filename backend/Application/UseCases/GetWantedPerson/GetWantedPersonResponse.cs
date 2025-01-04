namespace Application.UseCases.GetWantedPerson
{
    public record GetWantedPersonResponse(Guid Id, string Naame, string Surname, DateTime BirthDate);
}
