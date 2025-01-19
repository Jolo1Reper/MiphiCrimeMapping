namespace Application.UseCases.UpdateCrime
{
    public record UpdateCrimeRequest(
        Guid Id,
        Guid CrimeTypeId,
        Guid? WantedPersonId,
        string? WantedPersonName,
        string? WantedPersonSurname,
        DateTime? WantedPersonBirthDate,
        DateTime CrimeDate,
        string Location,
        double PointLatitude,
        double PointLongitude);
}
