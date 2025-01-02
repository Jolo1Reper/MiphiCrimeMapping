using Application.DTOs.Responses;
using Domain.Entities;

namespace Application.UseCases.Interfaces
{
    public interface IGetAllCrimesUseCase
    {
        Task<IEnumerable<ShowOnMapCrimeResponse>> Handle();
    }
}
