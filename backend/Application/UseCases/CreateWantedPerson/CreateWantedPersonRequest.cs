namespace Application.UseCases.CreateWantedPerson
{
    public record CreateWantedPersonRequest(string Name, string Surname, 
        string? Patronymic, DateTime BirthDate,
        string? RegistrationAddress, string? AddInfo);
}
