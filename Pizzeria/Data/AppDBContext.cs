using Microsoft.EntityFrameworkCore;
using Pizzeria.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pizzeria.Data
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        { }
        public DbSet<Ingrediente> Ingredientes { get; set; }
        public DbSet<Sucursal> Sucursales { get; set; }
        public DbSet<Address> Direcciones { get; set; }
        public DbSet<Pizza> Pizzas { get; set; }
        public DbSet<PizzasSucursal> PizzasSucursals { get; set; }
        public DbSet<IngredientePizza> IngredientePizzas { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Sucursal>().HasIndex(u => u.Nombre).IsUnique();
            builder.Entity<Pizza>().HasIndex(u => u.Nombre).IsUnique();
            builder.Entity<Ingrediente>().HasIndex(u => u.Nombre).IsUnique();
        }
    }
}
