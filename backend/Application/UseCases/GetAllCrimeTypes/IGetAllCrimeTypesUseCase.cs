using Application.Pagination;

namespace Application.UseCases.GetAllCrimeTypes
{
    public interface IGetAllCrimeTypesUseCase
    {
        Task<PaginatedResult<GetAllCrimeTypesResponse>> Handle(PaginationSearchParameters request);
    }
}
