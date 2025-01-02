using Application.DTOs.Requests;
using Domain.Entities;

namespace Application.Services.Interfaces
{
    public interface ICreateCrimeService
    {
        Task<Crime?> CreateCrime(CreateCrimeRequest data);
    }
}
