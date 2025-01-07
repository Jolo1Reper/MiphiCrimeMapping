﻿using Domain.Interfaces;

namespace Application.UseCases.DeleteWantedPerson
{
    public class DeleteWantedPersonUseCase : IDeleteWantedPersonUseCase
    {
        private ICrimeReportRepository _repo;

        public DeleteWantedPersonUseCase(ICrimeReportRepository crimeRepository)
        {
            _repo = crimeRepository;
        }
        public async Task<bool> Handle(Guid id)
        {
            return await _repo.DeleteWantedPerson(id);
        }
    }
}
