using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UseCases.GetCrime
{
    public interface IGetCrimeUseCase
    {
        Task<GetCrimeResponse?> Handle(Guid id);
    }
}
