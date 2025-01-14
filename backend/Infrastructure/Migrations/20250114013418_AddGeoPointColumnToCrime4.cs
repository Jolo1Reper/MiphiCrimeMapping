using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddGeoPointColumnToCrime4 : Migration
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
                oldType: "geometry");

            migrationBuilder.Sql("UPDATE \"Crimes\" SET \"Point\" = ST_SetSRID(ST_MakePoint(0, 0), 4326) WHERE \"Point\" IS NULL");
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

            // Удалить все дефолтные значения, если необходимо
            migrationBuilder.Sql("UPDATE \"Crimes\" SET \"Point\" = NULL WHERE \"Point\" = ST_SetSRID(ST_MakePoint(0, 0), 4326)");
        }
    }
}
