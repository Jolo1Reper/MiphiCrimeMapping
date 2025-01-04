namespace Application.UseCases.GetCrimeType
{
    public interface IGetCrimeTypeUseCase
    {
        Task<GetCrimeTypeResponse?> Handle(Guid id);
    }
}
