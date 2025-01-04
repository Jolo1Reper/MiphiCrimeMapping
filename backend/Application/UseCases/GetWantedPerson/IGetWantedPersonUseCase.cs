namespace Application.UseCases.GetWantedPerson
{
    public interface IGetWantedPersonUseCase
    {
        Task<GetWantedPersonResponse?> Handle(Guid id);
    }
}
