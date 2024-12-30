using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddIdRelashionshipsAndLawsuits : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CrimeTypes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CrimeTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WantedPersons",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Surname = table.Column<string>(type: "text", nullable: false),
                    Patronymic = table.Column<string>(type: "text", nullable: true),
                    BirthDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    RegistrationAddress = table.Column<string>(type: "text", nullable: true),
                    AddInfo = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WantedPersons", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Lawsuits",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Number = table.Column<string>(type: "text", nullable: false),
                    ReceiptDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    PersonId = table.Column<Guid>(type: "uuid", nullable: false),
                    Judge = table.Column<string>(type: "text", nullable: false),
                    DecisionDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Decision = table.Column<string>(type: "text", nullable: false),
                    EffectiveDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    JudicialActs = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lawsuits", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Lawsuits_WantedPersons_PersonId",
                        column: x => x.PersonId,
                        principalTable: "WantedPersons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Crimes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Applicant = table.Column<string>(type: "text", nullable: true),
                    TypeId = table.Column<Guid>(type: "uuid", nullable: false),
                    WantedPersonId = table.Column<Guid>(type: "uuid", nullable: false),
                    Location = table.Column<string>(type: "text", nullable: true),
                    CreateAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    LawsuitId = table.Column<Guid>(type: "uuid", nullable: true),
                    Point_Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Point_Latitude = table.Column<double>(type: "double precision", nullable: false),
                    Point_Longitude = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Crimes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Crimes_CrimeTypes_TypeId",
                        column: x => x.TypeId,
                        principalTable: "CrimeTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Crimes_Lawsuits_LawsuitId",
                        column: x => x.LawsuitId,
                        principalTable: "Lawsuits",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Crimes_WantedPersons_WantedPersonId",
                        column: x => x.WantedPersonId,
                        principalTable: "WantedPersons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Crimes_LawsuitId",
                table: "Crimes",
                column: "LawsuitId");

            migrationBuilder.CreateIndex(
                name: "IX_Crimes_TypeId",
                table: "Crimes",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Crimes_WantedPersonId",
                table: "Crimes",
                column: "WantedPersonId");

            migrationBuilder.CreateIndex(
                name: "IX_Lawsuits_PersonId",
                table: "Lawsuits",
                column: "PersonId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Crimes");

            migrationBuilder.DropTable(
                name: "CrimeTypes");

            migrationBuilder.DropTable(
                name: "Lawsuits");

            migrationBuilder.DropTable(
                name: "WantedPersons");
        }
    }
}
