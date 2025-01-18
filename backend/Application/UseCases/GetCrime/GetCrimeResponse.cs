namespace Application.UseCases.GetCrime
{
    public record GetCrimeResponse(
        Guid Id,
        Guid CrimeTypeId,
        string CrimeTypeTitle,
        Guid WantedPersonId,
        string WantedPersonName,
        string WantedPersonSurname,
        DateTime WantedPersonBirthDate,
        DateTime CreateAt,
        DateTime CrimeDate,
        string? Location,
        double PointLatitude,
        double PointLongitude);
}
