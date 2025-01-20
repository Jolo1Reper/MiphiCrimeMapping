using Application.Pagination;

namespace Application.UseCases.GetAllWantedPerson
{
    public interface IGetAllWantedPersonUseCase
    {
        Task<PaginatedResult<GetAllWantedPersonResponse>> Handle(PaginationSearchParameters request);
    }
}
