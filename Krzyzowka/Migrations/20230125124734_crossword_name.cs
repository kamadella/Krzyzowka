using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Krzyzowka.Migrations
{
    public partial class crossword_name : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "name",
                table: "Crosswords",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "name",
                table: "Crosswords");
        }
    }
}
