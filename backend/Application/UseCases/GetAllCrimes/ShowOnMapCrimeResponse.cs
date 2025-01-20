namespace Application.UseCases.GetAllCrimes
{
    public record ShowOnMapCrimeResponse(
        Guid Id,
        Guid CrimeTypeId,
        string? Location,
        string? Description,
        DateTime CrimeDate,
        double PointLatitude,
        double PointLongitude
    );

}
