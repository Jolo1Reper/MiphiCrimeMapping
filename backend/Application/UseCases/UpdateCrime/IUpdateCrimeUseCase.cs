using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UseCases.UpdateCrime
{
    public interface IUpdateCrimeUseCase
    {
        Task<UpdateCrimeResponse?> Handle(UpdateCrimeRequest request);
    }
}
