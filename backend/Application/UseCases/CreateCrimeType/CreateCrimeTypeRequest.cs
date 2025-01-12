namespace Application.UseCases.CreateCrimeType
{
    public record CreateCrimeTypeRequest(string Title, string? Description, string? Link, string? Color);
}
