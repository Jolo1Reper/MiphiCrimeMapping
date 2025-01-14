using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddGeoPointColumnToCrime5 : Migration
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

            migrationBuilder.Sql("UPDATE \"Crimes\" SET \"Point\" = ST_SetSRID(ST_MakePoint(0, 0), 4326) WHERE \"Point\" IS NULL");
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

            migrationBuilder.Sql("UPDATE \"Crimes\" SET \"Point\" = NULL WHERE \"Point\" = ST_SetSRID(ST_MakePoint(0, 0), 4326)");
        }
    }
}
