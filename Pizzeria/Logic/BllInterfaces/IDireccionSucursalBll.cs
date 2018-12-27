using ApiBobinaTesla.Bll;
using Pizzeria.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pizzeria.Logic.BllInterfaces
{
    public interface IDireccionSucursalBll
    {
        Task<BllResult> DeleteDirFromSucursal(int SucursalId);
        Task<BllResult> SetDirToSucursal(int direccionId, int SucursalId);
    }
}
