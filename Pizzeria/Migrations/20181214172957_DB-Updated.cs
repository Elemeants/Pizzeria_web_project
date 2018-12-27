using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Pizzeria.Migrations
{
    public partial class DBUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Telefono",
                table: "Pizzas");

            migrationBuilder.AddColumn<string>(
                name: "Telefono",
                table: "Sucursales",
                maxLength: 12,
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Costo",
                table: "Pizzas",
                maxLength: 12,
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Pizzas",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Ingrediente",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Nombre = table.Column<string>(nullable: true),
                    PizzaId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ingrediente", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ingrediente_Pizzas_PizzaId",
                        column: x => x.PizzaId,
                        principalTable: "Pizzas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ingrediente_PizzaId",
                table: "Ingrediente",
                column: "PizzaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ingrediente");

            migrationBuilder.DropColumn(
                name: "Telefono",
                table: "Sucursales");

            migrationBuilder.DropColumn(
                name: "Costo",
                table: "Pizzas");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Pizzas");

            migrationBuilder.AddColumn<string>(
                name: "Telefono",
                table: "Pizzas",
                maxLength: 12,
                nullable: true);
        }
    }
}
