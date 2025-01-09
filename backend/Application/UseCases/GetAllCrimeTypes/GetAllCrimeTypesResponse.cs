namespace Application.UseCases.GetAllCrimeTypes
{
    public record GetAllCrimeTypesResponse(Guid Id, string Title, string? Description, string? Link, int Count);
}
