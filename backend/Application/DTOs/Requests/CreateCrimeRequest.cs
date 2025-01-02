namespace Application.DTOs.Requests
{
    public record CreateCrimeRequest(
        Guid CrimeTypeId,
        Guid? WantedPersonId,
        string? WantedPersonName,
        string? WantedPersonSurname,
        DateTime WantedPersonBirthDate,
        DateTime CrimeDate,
        string Location,
        decimal PointLatitude,
        decimal PointLongitude);
}
