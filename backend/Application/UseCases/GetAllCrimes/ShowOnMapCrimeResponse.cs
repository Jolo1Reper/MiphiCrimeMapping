namespace Application.UseCases.GetAllCrimes
{
    public record ShowOnMapCrimeResponse(Guid Id, Guid CrimeTypeId, string? Location, DateTime CrimeDate, decimal PointLatitude, decimal PointLongitude);

}
