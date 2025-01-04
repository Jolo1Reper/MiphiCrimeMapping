namespace Application.UseCases.CreateCrime
{
    public interface ICreateCrimeUseCase
    {
        Task<CreateCrimeResponse?> Handle(CreateCrimeRequest request);
    }
}
