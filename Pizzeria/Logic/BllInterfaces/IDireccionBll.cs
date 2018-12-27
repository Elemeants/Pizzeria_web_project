using ApiBobinaTesla.Bll;
using Pizzeria.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pizzeria.Logic.BllInterfaces
{
    public interface IDireccionBll
    {
        Task<BllResult> Delete(int direccionId);
        Task<BllResult> Add(Address direccion);
        Task<BllResult> Update(Address direccion, int direccionId);
        BllResult GetAll();
        BllResult Get(int direccionId);
    }
}
