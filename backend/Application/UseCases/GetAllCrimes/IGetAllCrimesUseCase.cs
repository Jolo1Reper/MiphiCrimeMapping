using Domain.Entities;

namespace Application.UseCases.GetAllCrimes
{
    public interface IGetAllCrimesUseCase
    {
        Task<IEnumerable<ShowOnMapCrimeResponse>> Handle();
    }
}
