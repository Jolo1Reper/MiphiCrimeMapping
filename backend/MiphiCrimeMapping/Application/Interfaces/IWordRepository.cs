using Domain.Entities;

namespace Application.Interfaces
{
    public interface IWordRepository
    {
        Word? GetWordById(int id);
    }
}