using ApiBobinaTesla.Bll;
using Pizzeria.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pizzeria.Logic.BllInterfaces
{
    public interface IIngredienteBll
    {
        Task<BllResult> Delete(int ingredienteId);
        Task<BllResult> Add(Ingrediente ingrediente);
        Task<BllResult> Update(Ingrediente ingrediente, int ingredienteId);
        BllResult GetAll();
        BllResult Get(int ingredienteId);
    }
}
