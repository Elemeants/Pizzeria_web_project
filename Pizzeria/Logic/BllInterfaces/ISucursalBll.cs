using ApiBobinaTesla.Bll;
using Pizzeria.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pizzeria.Logic.BllInterfaces
{
    public interface ISucursalBll
    {
        Task<BllResult> DeleteSucursal(int sucursalId);
        Task<BllResult> UpdateSucursal(Sucursal sucursal, int sucursalId);
        BllResult GetSurcursales();
        BllResult GetSurcursalesWithDetails();
        BllResult GetSucursal(int sucursalId);
        BllResult GetSucursalByName(string sucursalName);
        Task<BllResult> AddSucursal(Sucursal sucursal);
    }
}
