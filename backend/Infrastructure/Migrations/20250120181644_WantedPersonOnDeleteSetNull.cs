using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class WantedPersonOnDeleteSetNull : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Crimes_WantedPersons_WantedPersonId",
                table: "Crimes");

            migrationBuilder.AddForeignKey(
                name: "FK_Crimes_WantedPersons_WantedPersonId",
                table: "Crimes",
                column: "WantedPersonId",
                principalTable: "WantedPersons",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Crimes_WantedPersons_WantedPersonId",
                table: "Crimes");

            migrationBuilder.AddForeignKey(
                name: "FK_Crimes_WantedPersons_WantedPersonId",
                table: "Crimes",
                column: "WantedPersonId",
                principalTable: "WantedPersons",
                principalColumn: "Id");
        }
    }
}
