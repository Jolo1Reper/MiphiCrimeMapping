namespace Application.UseCases.UpdateCrime
{
    public record UpdateCrimeRequest(
        Guid Id,
        Guid CrimeTypeId,
        Guid? WantedPersonId,
        string? WantedPersonName,
        string? WantedPersonSurname,
        string? WantedPersonPatronymic,
        DateTime? WantedPersonBirthDate,
        DateTime CrimeDate,
        string Location,
        string? Description,
        double PointLatitude,
        double PointLongitude);
}
