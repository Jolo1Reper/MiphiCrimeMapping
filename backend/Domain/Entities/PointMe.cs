using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [ComplexType]
    public class PointMe
    {
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
    }
}
