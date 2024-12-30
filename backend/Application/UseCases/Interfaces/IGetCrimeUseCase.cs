﻿using Application.DTOs.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UseCases.Interfaces
{
    public interface IGetCrimeUseCase
    {
        Task<GetCrimeResponse?> Handle(Guid id);
    }
}