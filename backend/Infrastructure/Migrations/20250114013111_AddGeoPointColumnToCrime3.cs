using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddGeoPointColumnToCrime3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Point>(
                name: "Point",
                table: "Crimes",
                type: "geometry",
                nullable: true,
                oldClrType: typeof(Point),
                oldType: "geometry",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Point>(
                name: "Point",
                table: "Crimes",
                type: "geometry",
                nullable: true,
                oldClrType: typeof(Point),
                oldType: "geometry");
        }
    }
}
