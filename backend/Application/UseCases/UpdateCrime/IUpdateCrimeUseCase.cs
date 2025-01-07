namespace Application.UseCases.UpdateCrime
{
    public interface IUpdateCrimeUseCase
    {
        Task<CrimeReportResponse?> Handle(UpdateCrimeRequest request);
    }
}
