using Application.DTOs.Responses;
using Domain.Entities;

namespace Application.UseCases.Interfaces
{
    public interface IGetAllCrimeUseCase
    {
        Task<IEnumerable<ShowOnMapCrimeResponse>> Handle();
    }
}
