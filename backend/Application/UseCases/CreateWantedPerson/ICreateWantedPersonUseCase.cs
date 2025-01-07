namespace Application.UseCases.CreateWantedPerson
{
    public interface ICreateWantedPersonUseCase
    {
        Task<CrimeReportResponse?> Handle(CreateWantedPersonRequest request);
    }
}
