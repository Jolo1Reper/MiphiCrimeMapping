﻿namespace Application.DTOs.Responses
{
    public record ShowOnMapCrimeResponse(Guid Id, string CrimeTypeTitle, string? Location, double XPoint, double YPoint);

}