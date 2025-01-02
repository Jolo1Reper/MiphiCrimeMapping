using Application.DTOs.Responses;

namespace Application.UseCases.Interfaces
{
    public interface IGetAllCrimeTypesUseCase
    {
        Task<IEnumerable<SelectCrimeTypeResponse>> Handle();
    }
}
