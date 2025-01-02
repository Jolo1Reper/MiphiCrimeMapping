using Application.UseCases.Interfaces;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UseCases
{
    public class DeleteCrimeUseCase : IDeleteCrimeUseCase
    {
        private ICrimeReportRepository _repo;

        public DeleteCrimeUseCase(ICrimeReportRepository crimeRepository)
        {
            _repo = crimeRepository;
        }

        public async Task Handle(Guid id)
        {
            await _repo.DeleteCrime(id);
        }
    }
}
