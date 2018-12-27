using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Pizzeria.Data.Models
{
    public class PizzasSucursal
    {
        public int Id { get; set; }
        [ForeignKey("Pizza")]
        public int PizzaId { get; set; }
        public Pizza pizza { get; set; }
        [ForeignKey("Sucursal")]
        public int SucursalId { get; set; }
        public Sucursal sucursal { get; set; }
    }
}
