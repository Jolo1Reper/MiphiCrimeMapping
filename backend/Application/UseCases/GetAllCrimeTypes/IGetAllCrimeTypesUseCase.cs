﻿namespace Application.UseCases.GetAllCrimeTypes
{
    public interface IGetAllCrimeTypesUseCase
    {
        Task<IEnumerable<SelectCrimeTypeResponse>> Handle();
    }
}
