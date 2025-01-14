using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;
using NetTopologySuite.Geometries;
using ProjNet.CoordinateSystems;
using ProjNet.CoordinateSystems.Transformations;

namespace Application.Filters
{
    public class RadiusFilter : IFilter<Crime>
    {
        public IQueryable<Crime> Apply(IQueryable<Crime> query, CrimeFilterRequest filterRequest)
        {
            if (filterRequest.Latitude == null || filterRequest.Longitude == null || filterRequest.Radius == null) return query;

            var (latitude, longitude, radius) = (filterRequest.Latitude, filterRequest.Longitude, filterRequest.Radius);

            // Создаем точку в SRID 4326 (градусы)
            var centerPoint = new Point((double)longitude, (double)latitude) { SRID = 4326 };

            // Преобразуем точку из SRID 4326 в SRID 3857 (метры)
            var sourceCoordinateSystem = GeographicCoordinateSystem.WGS84; // SRID 4326
            var targetCoordinateSystem = ProjectedCoordinateSystem.WebMercator; // SRID 3857

            // Создаем фабрику трансформации
            var transformationFactory = new CoordinateTransformationFactory();
            ICoordinateTransformation transformation = transformationFactory.CreateFromCoordinateSystems(sourceCoordinateSystem, targetCoordinateSystem);

            // Преобразуем координаты
            var (x, y) = transformation.MathTransform.Transform(centerPoint.X, centerPoint.Y);

            // Преобразуем точку в новый тип (3857)
            var centerPoint3857 = new Point(x, y) { SRID = 3857 };

            return query.Where(c => 
                c.Point.Distance(centerPoint3857) <= radius); //TODO
        }
    }
        // TODO 4326 -> 3857????
}
