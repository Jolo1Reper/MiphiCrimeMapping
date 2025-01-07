namespace Application.UseCases.CreateCrime
{
    public interface ICreateCrimeUseCase
    {
        Task<CrimeReportResponse?> Handle(CreateCrimeRequest request);
    }
}
