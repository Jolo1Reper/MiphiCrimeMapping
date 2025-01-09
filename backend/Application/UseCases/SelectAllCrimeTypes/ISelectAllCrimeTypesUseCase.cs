namespace Application.UseCases.SelectAllCrimeTypes
{
    public interface ISelectAllCrimeTypesUseCase
    {
        Task<IEnumerable<SelectCrimeTypeResponse>> Handle();
    }
}
