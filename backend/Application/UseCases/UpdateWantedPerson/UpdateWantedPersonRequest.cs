namespace Application.UseCases.UpdateWantedPerson
{
    public record UpdateWantedPersonRequest(Guid Id, string Name, string Surname,
        string? Patronymic, DateTime BirthDate,
        string? RegistrationAddress, string? AddInfo);
}
