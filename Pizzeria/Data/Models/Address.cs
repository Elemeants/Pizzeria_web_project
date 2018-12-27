using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Pizzeria.Data.Models
{
    public class Address
    {
        public int Id {get; set;}
        public string Direccion { get; set; }
        public string Colonia { get; set; }
        [ForeignKey("Sucursal")]
        public int SucursalId { get; set; }
        public Sucursal Sucursal { get; set; }
    }
}
