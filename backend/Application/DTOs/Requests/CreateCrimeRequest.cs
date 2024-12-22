namespace Application.DTOs.Requests
{
    public record CreateCrimeRequest(
        string CrimeTypeTitle,
        string WantedPersonName,
        string WantedPersonSurname,
        DateTime WantedPersonBirthDate,
        DateTime CrimeDate,
        string Location,
        double PointLatitude,
        double PointLongitude);
}
