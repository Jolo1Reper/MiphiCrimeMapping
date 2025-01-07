namespace Application.UseCases.DeleteCrimeType
{
    public interface IDeleteCrimeTypeUseCase
    {
        Task<bool> Handle(Guid id);
    }
}
