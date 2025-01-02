using Application.DTOs.Responses;

namespace Application.UseCases.Interfaces
{
    public interface IGetWantedPersonUseCase
    {
        Task<GetWantedPersonResponse?> Handle(Guid id);
    }
}
