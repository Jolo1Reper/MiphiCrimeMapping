using Application.Interfaces;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class MergeWordService : IWordService
    {
        IWordRepository _repo;
        public MergeWordService(IWordRepository repository) 
        {
            _repo = repository;
        }

        public string GetToIdAndMerge(int id, string? title)
        {
            Word? word = _repo.GetWordById(id);
            if (word != null)
            {
                string merge = $"{word.Text} {title}";
                return merge;
            }
            else
            {
                throw new Exception("word is null");
            }
        }
    }
}
