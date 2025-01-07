namespace Application.UseCases.CreateCrimeType
{
    public interface ICreateCrimeTypeUseCase
    {
        Task<CrimeReportResponse?> Handle(CreateCrimeTypeRequest request);
    }
}
