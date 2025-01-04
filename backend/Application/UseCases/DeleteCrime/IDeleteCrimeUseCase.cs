using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UseCases.DeleteCrime
{
    public interface IDeleteCrimeUseCase
    {
        Task Handle(Guid id);
    }
}
