namespace Application.UseCases.GetAllWantedPerson
{
    public record GetAllWantedPersonResponse(Guid Id, 
        string Name, string Surname, string? Patronymic, DateTime BirthDate, 
        string? RegistrationAddress, string? AddInfo, int Count);
}
