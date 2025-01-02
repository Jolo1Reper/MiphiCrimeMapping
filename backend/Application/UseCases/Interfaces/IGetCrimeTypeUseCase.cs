using Application.DTOs.Responses;

namespace Application.UseCases.Interfaces
{
    public interface IGetCrimeTypeUseCase
    {
        Task<GetCrimeTypeResponse?> Handle(Guid id);
    }
}
