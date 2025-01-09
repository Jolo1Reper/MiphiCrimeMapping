namespace Application.UseCases.SelectAllWantedPersons
{
    public interface ISelectAllWantedPersonsUseCase
    {
        Task<IEnumerable<SelectAllWantedPersonResponse>> Handle();
    }
}
