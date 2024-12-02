using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [ComplexType]
    public class Point
    {
        public double X { get; set; }
        public double Y { get; set; }
    }
}
