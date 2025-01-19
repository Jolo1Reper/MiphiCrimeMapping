using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class WantedPersonSetNull : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Crimes_WantedPersons_WantedPersonId",
                table: "Crimes");

            migrationBuilder.AlterColumn<Guid>(
                name: "WantedPersonId",
                table: "Crimes",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddForeignKey(
                name: "FK_Crimes_WantedPersons_WantedPersonId",
                table: "Crimes",
                column: "WantedPersonId",
                principalTable: "WantedPersons",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Crimes_WantedPersons_WantedPersonId",
                table: "Crimes");

            migrationBuilder.AlterColumn<Guid>(
                name: "WantedPersonId",
                table: "Crimes",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Crimes_WantedPersons_WantedPersonId",
                table: "Crimes",
                column: "WantedPersonId",
                principalTable: "WantedPersons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
