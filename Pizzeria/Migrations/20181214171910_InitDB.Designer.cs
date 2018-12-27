﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Pizzeria.Data;

namespace Pizzeria.Migrations
{
    [DbContext(typeof(AppDBContext))]
    [Migration("20181214171910_InitDB")]
    partial class InitDB
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Pizzeria.Data.Models.Address", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Colonia");

                    b.Property<string>("Direccion");

                    b.Property<int>("SucursalId");

                    b.HasKey("Id");

                    b.HasIndex("SucursalId")
                        .IsUnique();

                    b.ToTable("Direcciones");
                });

            modelBuilder.Entity("Pizzeria.Data.Models.Pizza", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("Telefono")
                        .HasMaxLength(12);

                    b.HasKey("Id");

                    b.ToTable("Pizzas");
                });

            modelBuilder.Entity("Pizzeria.Data.Models.PizzasSucursal", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("PizzaId");

                    b.Property<int>("SucursalId");

                    b.HasKey("Id");

                    b.HasIndex("PizzaId");

                    b.HasIndex("SucursalId");

                    b.ToTable("PizzasSucursals");
                });

            modelBuilder.Entity("Pizzeria.Data.Models.Sucursal", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AddressId");

                    b.Property<string>("Nombre")
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.ToTable("Sucursales");
                });

            modelBuilder.Entity("Pizzeria.Data.Models.Address", b =>
                {
                    b.HasOne("Pizzeria.Data.Models.Sucursal", "Sucursal")
                        .WithOne("Direccion")
                        .HasForeignKey("Pizzeria.Data.Models.Address", "SucursalId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Pizzeria.Data.Models.PizzasSucursal", b =>
                {
                    b.HasOne("Pizzeria.Data.Models.Pizza", "pizza")
                        .WithMany("PizzasSucursals")
                        .HasForeignKey("PizzaId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Pizzeria.Data.Models.Sucursal", "sucursal")
                        .WithMany("PizzasSucursals")
                        .HasForeignKey("SucursalId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
