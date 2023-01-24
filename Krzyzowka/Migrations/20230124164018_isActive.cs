using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Krzyzowka.Migrations
{
    public partial class isActive : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isActive",
                table: "GuessWords",
                type: "bit",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AddColumn<bool>(
                name: "isActive",
                table: "Crosswords",
                type: "bit",
                nullable: false,
                defaultValue: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isActive",
                table: "GuessWords");

            migrationBuilder.DropColumn(
                name: "isActive",
                table: "Crosswords");
        }
    }
}
