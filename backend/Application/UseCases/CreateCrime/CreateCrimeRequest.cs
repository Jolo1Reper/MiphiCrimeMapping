namespace Application.UseCases.CreateCrime
{
    public record CreateCrimeRequest(
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
