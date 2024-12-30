using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [ComplexType]
    public class Point
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
