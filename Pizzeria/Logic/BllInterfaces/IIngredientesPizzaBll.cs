using ApiBobinaTesla.Bll;
using Pizzeria.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pizzeria.Logic.BllInterfaces
{
    public interface IIngredientesPizzaBll
    {
        Task<BllResult> DeleteIngredienteFromPizza(int ingredienteId, int pizzaId);
        Task<BllResult> AddIngredienteToPizza(int ingredienteId, int pizzaId);
        BllResult GetIngredientesInPizza(int pizzaId);
    }
}
