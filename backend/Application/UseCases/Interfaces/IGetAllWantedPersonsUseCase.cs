using Application.DTOs.Responses;

namespace Application.UseCases.Interfaces
{
    public interface IGetAllWantedPersonsUseCase
    {
        Task<IEnumerable<SelectWantedPersonResponse>> Handle();
    }
}
