using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Pizzeria.Data.Models
{
    public class Pizza
    {
        public int Id { get; set; }
        [StringLength(50)]
        [Required]
        public string Nombre { get; set; }
        public double Costo { get; set; }
        public string Image { get; set; }
        public List<IngredientePizza> IngredientePizzas { get; set; }
        public List<PizzasSucursal> PizzasSucursals { get; set; }
    }
}
