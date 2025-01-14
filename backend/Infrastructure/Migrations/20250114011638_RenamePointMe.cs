using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RenamePointMe : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Point_Longitude",
                table: "Crimes",
                newName: "PointMe_Longitude");

            migrationBuilder.RenameColumn(
                name: "Point_Latitude",
                table: "Crimes",
                newName: "PointMe_Latitude");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PointMe_Longitude",
                table: "Crimes",
                newName: "Point_Longitude");

            migrationBuilder.RenameColumn(
                name: "PointMe_Latitude",
                table: "Crimes",
                newName: "Point_Latitude");
        }
    }
}
