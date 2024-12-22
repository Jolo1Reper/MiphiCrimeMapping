using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Requests
{
    public record UpdateCrimeRequest(
        Guid Id,
        string CrimeTypeTitle,
        string WantedPersonName,
        string WantedPersonSurname,
        DateTime WantedPersonBirthDate,
        DateTime CrimeDate,
        string Location,
        double PointLatitude,
        double PointLongitude);
}
