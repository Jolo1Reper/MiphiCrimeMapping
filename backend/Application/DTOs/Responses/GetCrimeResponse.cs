using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Responses
{
    public record GetCrimeResponse(
        Guid Id,
        string CrimeTypeTitle,
        string WantedPersonName,
        string WantedPersonSurname,
        DateTime WantedPersonBirthDate,
        DateTime CreateAt,
        DateTime CrimeDate,
        string? Location,
        double PointLatitude,
        double PointLongitude);
}
