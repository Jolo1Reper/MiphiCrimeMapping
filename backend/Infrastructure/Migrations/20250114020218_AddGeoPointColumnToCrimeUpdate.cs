using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddGeoPointColumnToCrimeUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PointMe_Latitude",
                table: "Crimes");

            migrationBuilder.DropColumn(
                name: "PointMe_Longitude",
                table: "Crimes");

            migrationBuilder.AlterColumn<Point>(
                name: "Point",
                table: "Crimes",
                type: "geometry",
                nullable: false,
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

            migrationBuilder.AddColumn<decimal>(
                name: "PointMe_Latitude",
                table: "Crimes",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "PointMe_Longitude",
                table: "Crimes",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
