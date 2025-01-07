namespace Application.UseCases.DeleteWantedPerson
{
    public interface IDeleteWantedPersonUseCase
    {
        Task<bool> Handle(Guid id);
    }
}
