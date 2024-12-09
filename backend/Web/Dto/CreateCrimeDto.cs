namespace Web.Dto
{
    public record CreateCrimeDto
    (
        string CrimeTypeTitle,
        string WantedPersonName,
        string WantedPersonSurname,
        DateTime WantedPersonBirthDate,
        string Location,
        double XPoint,
        double YPoint
    );
}
