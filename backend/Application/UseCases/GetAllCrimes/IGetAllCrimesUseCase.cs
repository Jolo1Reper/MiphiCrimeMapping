using Domain.Entities;
using Domain.Models;

namespace Application.UseCases.GetAllCrimes
{
    public interface IGetAllCrimesUseCase
    {
        Task<IEnumerable<ShowOnMapCrimeResponse>> Handle(CrimeFilterRequest filterRequest);
    }
}
