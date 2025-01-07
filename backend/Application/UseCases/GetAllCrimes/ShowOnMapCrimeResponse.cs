namespace Application.UseCases.GetAllCrimes
{
    public record ShowOnMapCrimeResponse(Guid Id, string CrimeTypeTitle, string? Location, decimal PointLatitude, decimal PointLongitude);

}
