using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Pizzeria.Data.Models
{
    public class IngredientePizza
    {
        public int Id { get; set; }
        [ForeignKey("Pizza")]
        public int PizzaId { get; set; }
        public Pizza pizza { get; set; }
        [ForeignKey("Ingrediente")]
        public int IngredienteId { get; set; }
        public Ingrediente ingrediente { get; set; }
    }
}
