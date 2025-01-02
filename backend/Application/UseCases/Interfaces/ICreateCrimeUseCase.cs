using Application.DTOs.Requests;
using Application.DTOs.Responses;

namespace Application.UseCases.Interfaces
{
    public interface ICreateCrimeUseCase
    {
        Task<CreateCrimeResponse?> Handle(CreateCrimeRequest request);
    }
}
