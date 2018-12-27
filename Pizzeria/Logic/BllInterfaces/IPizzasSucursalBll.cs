using ApiBobinaTesla.Bll;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pizzeria.Logic.BllInterfaces
{
    public interface IPizzasSucursalBll
    {
        Task<BllResult> DeletePizzaFromSucursal(int sucursalId, int pizzaId);
        Task<BllResult> AddPizzaToSucursal(int sucursalId, int pizzaId);
        BllResult GetPizzasInSucursal(int sucursalId);
        BllResult GetPizzaInSucursal(int sucursalId, int pizzaId);
        BllResult GetSucursalesFromPizza(int pizzaId);
    }
}
