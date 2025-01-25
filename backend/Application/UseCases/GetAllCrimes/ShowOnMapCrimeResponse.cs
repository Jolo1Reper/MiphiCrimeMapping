namespace Application.UseCases.GetAllCrimes
{
    public record ShowOnMapCrimeResponse(
        Guid Id,
        Guid CrimeTypeId,
        Guid? WantedPersonId,
        string? Location,
        string? Description,
        DateTime CrimeDate,
        double PointLatitude,
        double PointLongitude
    );

}
