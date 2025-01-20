namespace Application.UseCases.GetCrime
{
    public record GetCrimeResponse(
        Guid Id,
        Guid CrimeTypeId,
        string CrimeTypeTitle,
        Guid? WantedPersonId,
        string? WantedPersonName,
        string? WantedPersonSurname,
        string? WantedPersonPatronymic,
        DateTime? WantedPersonBirthDate,
        DateTime CreateAt,
        DateTime CrimeDate,
        string? Location,
        string? Description,
        double PointLatitude,
        double PointLongitude);
}
