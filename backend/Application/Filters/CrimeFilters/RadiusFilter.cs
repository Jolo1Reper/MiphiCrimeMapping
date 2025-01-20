using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;
using NetTopologySuite.Geometries;

namespace Application.Filters.CrimeFilters
{
    public class RadiusFilter : IRequestFilter<Crime>
    {
        public IQueryable<Crime> Apply(IQueryable<Crime> query, CrimeFilterRequest filterRequest)
        {
            if (filterRequest.Latitude == null || filterRequest.Longitude == null || filterRequest.Radius == null) return query;

            (double latitude, double longitude, double radius) = ((double)filterRequest.Latitude,
                (double)filterRequest.Longitude, (double)filterRequest.Radius);

            // Создаем точку в SRID 4326 (градусы)
            var centerPoint = new Point(longitude, latitude) { SRID = 4326 };

            return query.Where(c =>
                c.Point.IsWithinDistance(centerPoint, radius * 0.01));
        }
    }
}
