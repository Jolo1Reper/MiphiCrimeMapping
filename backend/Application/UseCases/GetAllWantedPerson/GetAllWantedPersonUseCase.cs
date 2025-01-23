using Application.Pagination;
using Domain.Interfaces;

namespace Application.UseCases.GetAllWantedPerson
{
    public class GetAllWantedPersonUseCase : IGetAllWantedPersonUseCase
    {
        private readonly IWantedPersonRepository _repo;
        public GetAllWantedPersonUseCase(IWantedPersonRepository repository)
        {
            _repo = repository;
        }

        public async Task<PaginatedResult<GetAllWantedPersonResponse>> Handle(PaginationSearchParameters request)
        {
            var wantedPersons = await _repo.GetAllWantedPersonsWithCountAndFilters(request.SearchQuery, request.Page, request.PageSize);
            var totalItems = await _repo.GetWantedPersonsCount(request.SearchQuery);

            IEnumerable<GetAllWantedPersonResponse> personDtos = wantedPersons.Select(p => new GetAllWantedPersonResponse(
                p.WantedPerson.Id, 
                p.WantedPerson.Name, 
                p.WantedPerson.Surname, 
                p.WantedPerson.Patronymic, 
                p.WantedPerson.BirthDate,
                p.WantedPerson.RegistrationAddress, 
                p.WantedPerson.AddInfo, 
                p.CrimeCount
            ));

            return new PaginatedResult<GetAllWantedPersonResponse>(personDtos, totalItems, request.PageSize);
        }
    }
}
