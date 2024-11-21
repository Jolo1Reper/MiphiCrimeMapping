using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class FanRepository : IWordRepository
    {
        DemoDb _db;
        public FanRepository(DemoDb db) 
        {
            _db = db;
        }

        public Word? GetWordById(int id)
        {
            Word? word = _db.Words.FirstOrDefault(w => w.Id == id);
            return word;
        }
    }
}
