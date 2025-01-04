namespace Application.UseCases.GetAllCrimes
{
    public record ShowOnMapCrimeResponse(Guid Id, string CrimeTypeTitle, string? Location, decimal XPoint, decimal YPoint);

}
