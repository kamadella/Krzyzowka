using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Krzyzowka.Migrations
{
    public partial class Crossword : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Crosswords",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    width = table.Column<int>(type: "int", nullable: false),
                    height = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Crosswords", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GuessWord",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    word = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    clue = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GuessWord", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CrosswordSaves",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    crosswordId = table.Column<int>(type: "int", nullable: false),
                    filledCells = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    finished = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CrosswordSaves", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CrosswordSaves_Crosswords_crosswordId",
                        column: x => x.crosswordId,
                        principalTable: "Crosswords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WordPlacement",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    x = table.Column<int>(type: "int", nullable: false),
                    y = table.Column<int>(type: "int", nullable: false),
                    vertical = table.Column<bool>(type: "bit", nullable: false),
                    wordId = table.Column<int>(type: "int", nullable: false),
                    CrosswordId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WordPlacement", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WordPlacement_Crosswords_CrosswordId",
                        column: x => x.CrosswordId,
                        principalTable: "Crosswords",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_WordPlacement_GuessWord_wordId",
                        column: x => x.wordId,
                        principalTable: "GuessWord",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CrosswordSaves_crosswordId",
                table: "CrosswordSaves",
                column: "crosswordId");

            migrationBuilder.CreateIndex(
                name: "IX_WordPlacement_CrosswordId",
                table: "WordPlacement",
                column: "CrosswordId");

            migrationBuilder.CreateIndex(
                name: "IX_WordPlacement_wordId",
                table: "WordPlacement",
                column: "wordId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CrosswordSaves");

            migrationBuilder.DropTable(
                name: "WordPlacement");

            migrationBuilder.DropTable(
                name: "Crosswords");

            migrationBuilder.DropTable(
                name: "GuessWord");
        }
    }
}
