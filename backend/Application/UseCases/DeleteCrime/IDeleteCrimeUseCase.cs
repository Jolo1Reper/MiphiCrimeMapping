namespace Application.UseCases.DeleteCrime
{
    public interface IDeleteCrimeUseCase
    {
        Task<bool> Handle(Guid id);
    }
}
