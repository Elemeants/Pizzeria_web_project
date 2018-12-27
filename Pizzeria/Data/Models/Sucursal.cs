using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Pizzeria.Data.Models
{
    public class Sucursal
    {
        public int Id { get; set; }
        [StringLength(50)]
        public string Nombre { get; set; }
        [StringLength(12)]
        public string Telefono { get; set; }
        [ForeignKey("Address")]
        public int? AddressId { get; set; }
        public Address Direccion { get; set; }
        public List<PizzasSucursal> PizzasSucursals { get; set; }
    }
}
