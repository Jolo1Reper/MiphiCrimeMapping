using Application.UseCases.CreateCrime;
using Domain.Entities;

namespace Application.Services.Interfaces
{
    public interface ICreateCrimeService
    {
        Task<Crime?> CreateCrime(CreateCrimeRequest data);
    }
}
