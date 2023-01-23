using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Krzyzowka.Migrations
{
    public partial class CrosswordFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WordPlacement_Crosswords_CrosswordId",
                table: "WordPlacement");

            migrationBuilder.DropForeignKey(
                name: "FK_WordPlacement_GuessWord_wordId",
                table: "WordPlacement");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WordPlacement",
                table: "WordPlacement");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GuessWord",
                table: "GuessWord");

            migrationBuilder.RenameTable(
                name: "WordPlacement",
                newName: "WordPlacements");

            migrationBuilder.RenameTable(
                name: "GuessWord",
                newName: "GuessWords");

            migrationBuilder.RenameIndex(
                name: "IX_WordPlacement_wordId",
                table: "WordPlacements",
                newName: "IX_WordPlacements_wordId");

            migrationBuilder.RenameIndex(
                name: "IX_WordPlacement_CrosswordId",
                table: "WordPlacements",
                newName: "IX_WordPlacements_CrosswordId");

            migrationBuilder.AlterColumn<int>(
                name: "CrosswordId",
                table: "WordPlacements",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_WordPlacements",
                table: "WordPlacements",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GuessWords",
                table: "GuessWords",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WordPlacements_Crosswords_CrosswordId",
                table: "WordPlacements",
                column: "CrosswordId",
                principalTable: "Crosswords",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WordPlacements_GuessWords_wordId",
                table: "WordPlacements",
                column: "wordId",
                principalTable: "GuessWords",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WordPlacements_Crosswords_CrosswordId",
                table: "WordPlacements");

            migrationBuilder.DropForeignKey(
                name: "FK_WordPlacements_GuessWords_wordId",
                table: "WordPlacements");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WordPlacements",
                table: "WordPlacements");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GuessWords",
                table: "GuessWords");

            migrationBuilder.RenameTable(
                name: "WordPlacements",
                newName: "WordPlacement");

            migrationBuilder.RenameTable(
                name: "GuessWords",
                newName: "GuessWord");

            migrationBuilder.RenameIndex(
                name: "IX_WordPlacements_wordId",
                table: "WordPlacement",
                newName: "IX_WordPlacement_wordId");

            migrationBuilder.RenameIndex(
                name: "IX_WordPlacements_CrosswordId",
                table: "WordPlacement",
                newName: "IX_WordPlacement_CrosswordId");

            migrationBuilder.AlterColumn<int>(
                name: "CrosswordId",
                table: "WordPlacement",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WordPlacement",
                table: "WordPlacement",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GuessWord",
                table: "GuessWord",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WordPlacement_Crosswords_CrosswordId",
                table: "WordPlacement",
                column: "CrosswordId",
                principalTable: "Crosswords",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WordPlacement_GuessWord_wordId",
                table: "WordPlacement",
                column: "wordId",
                principalTable: "GuessWord",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
