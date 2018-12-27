using Microsoft.EntityFrameworkCore.Migrations;

namespace Pizzeria.Migrations
{
    public partial class IngredientesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ingrediente_Pizzas_PizzaId",
                table: "Ingrediente");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Ingrediente",
                table: "Ingrediente");

            migrationBuilder.RenameTable(
                name: "Ingrediente",
                newName: "Ingredientes");

            migrationBuilder.RenameIndex(
                name: "IX_Ingrediente_PizzaId",
                table: "Ingredientes",
                newName: "IX_Ingredientes_PizzaId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Ingredientes",
                table: "Ingredientes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ingredientes_Pizzas_PizzaId",
                table: "Ingredientes",
                column: "PizzaId",
                principalTable: "Pizzas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ingredientes_Pizzas_PizzaId",
                table: "Ingredientes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Ingredientes",
                table: "Ingredientes");

            migrationBuilder.RenameTable(
                name: "Ingredientes",
                newName: "Ingrediente");

            migrationBuilder.RenameIndex(
                name: "IX_Ingredientes_PizzaId",
                table: "Ingrediente",
                newName: "IX_Ingrediente_PizzaId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Ingrediente",
                table: "Ingrediente",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ingrediente_Pizzas_PizzaId",
                table: "Ingrediente",
                column: "PizzaId",
                principalTable: "Pizzas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
