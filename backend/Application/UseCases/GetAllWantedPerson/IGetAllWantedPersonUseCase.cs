namespace Application.UseCases.GetAllWantedPerson
{
    public interface IGetAllWantedPersonUseCase
    {
        Task<IEnumerable<GetAllWantedPersonResponse>> Handle();
    }
}
