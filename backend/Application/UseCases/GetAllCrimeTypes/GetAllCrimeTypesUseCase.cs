using Application.Pagination;
using Application.UseCases.GetAllWantedPerson;
using Domain.Interfaces;

namespace Application.UseCases.GetAllCrimeTypes
{
    public class GetAllCrimeTypesUseCase : IGetAllCrimeTypesUseCase
    {
        private readonly ICrimeTypeRepository _repo;
        public GetAllCrimeTypesUseCase(ICrimeTypeRepository repository)
        {
            _repo = repository;
        }

        public async Task<PaginatedResult<GetAllCrimeTypesResponse>> Handle(PaginationSearchParameters request)
        {
            var crimeTypes = await _repo.GetAllCrimeTypesWithCountAndFilters(request.SearchQuery, request.Page, request.PageSize);
            var totalItems = await _repo.GetCrimeTypesCount(request.SearchQuery);

            IEnumerable<GetAllCrimeTypesResponse> crimeTypeDtos = crimeTypes.Select(t => new GetAllCrimeTypesResponse(
                t.CrimeType.Id, 
                t.CrimeType.Title, 
                t.CrimeType.Description, 
                t.CrimeType.Link, 
                t.CrimeType.Color, 
                t.CrimeCount));

            return new PaginatedResult<GetAllCrimeTypesResponse>(crimeTypeDtos, totalItems, request.PageSize);
        }
    }
}
