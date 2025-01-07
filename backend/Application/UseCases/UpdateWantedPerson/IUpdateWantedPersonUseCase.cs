namespace Application.UseCases.UpdateWantedPerson
{
    public interface IUpdateWantedPersonUseCase
    {
        Task<CrimeReportResponse?> Handle(UpdateWantedPersonRequest request);
    }
}
