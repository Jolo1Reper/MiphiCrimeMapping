namespace Application.UseCases.UpdateCrimeType
{
    public record UpdateCrimeTypeRequest(Guid Id, string Title, string? Description, string? Link, string? Color);
}
