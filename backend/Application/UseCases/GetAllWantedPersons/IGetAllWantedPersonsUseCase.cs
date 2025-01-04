namespace Application.UseCases.GetAllWantedPersons
{
    public interface IGetAllWantedPersonsUseCase
    {
        Task<IEnumerable<SelectWantedPersonResponse>> Handle();
    }
}
