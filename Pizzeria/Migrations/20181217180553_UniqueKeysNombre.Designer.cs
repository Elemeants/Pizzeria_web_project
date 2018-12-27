﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Pizzeria.Data;

namespace Pizzeria.Migrations
{
    [DbContext(typeof(AppDBContext))]
    [Migration("20181217180553_UniqueKeysNombre")]
    partial class UniqueKeysNombre
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

            modelBuilder.Entity("Pizzeria.Data.Models.Ingrediente", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Nombre");

                    b.HasKey("Id");

                    b.HasIndex("Nombre")
                        .IsUnique()
                        .HasFilter("[Nombre] IS NOT NULL");

                    b.ToTable("Ingredientes");
                });

            modelBuilder.Entity("Pizzeria.Data.Models.IngredientePizza", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("IngredienteId");

                    b.Property<int>("PizzaId");

                    b.HasKey("Id");

                    b.HasIndex("IngredienteId");

                    b.HasIndex("PizzaId");

                    b.ToTable("IngredientePizzas");
                });

            modelBuilder.Entity("Pizzeria.Data.Models.Pizza", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("Costo")
                        .HasMaxLength(12);

                    b.Property<string>("Image");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.HasIndex("Nombre")
                        .IsUnique();

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

                    b.Property<int?>("AddressId");

                    b.Property<string>("Nombre")
                        .HasMaxLength(50);

                    b.Property<string>("Telefono")
                        .HasMaxLength(12);

                    b.HasKey("Id");

                    b.HasIndex("Nombre")
                        .IsUnique()
                        .HasFilter("[Nombre] IS NOT NULL");

                    b.ToTable("Sucursales");
                });

            modelBuilder.Entity("Pizzeria.Data.Models.Address", b =>
                {
                    b.HasOne("Pizzeria.Data.Models.Sucursal", "Sucursal")
                        .WithOne("Direccion")
                        .HasForeignKey("Pizzeria.Data.Models.Address", "SucursalId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Pizzeria.Data.Models.IngredientePizza", b =>
                {
                    b.HasOne("Pizzeria.Data.Models.Ingrediente", "ingrediente")
                        .WithMany()
                        .HasForeignKey("IngredienteId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Pizzeria.Data.Models.Pizza", "pizza")
                        .WithMany("IngredientePizzas")
                        .HasForeignKey("PizzaId")
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
