using ApiBobinaTesla.Bll;
using Pizzeria.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pizzeria.Logic.BllInterfaces
{
    public interface IPizzaBll
    {
        Task<BllResult> DeletePizza(int pizzaId);
        Task<BllResult> UpdatePizza(Pizza pizza, int pizzaId);
        Task<BllResult> AddPizza(Pizza pizza);
        BllResult GetPizzasWithIngredients();
        BllResult GetPizzas();
        BllResult GetPizza(int pizzaId);
    }
}
