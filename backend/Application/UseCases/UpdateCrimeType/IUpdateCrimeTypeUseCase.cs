namespace Application.UseCases.UpdateCrimeType
{
    public interface IUpdateCrimeTypeUseCase
    {
        Task<CrimeReportResponse?> Handle(UpdateCrimeTypeRequest request);
    }
}
