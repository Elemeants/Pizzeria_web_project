using ApiBobinaTesla.Bll;
using Microsoft.EntityFrameworkCore;
using Pizzeria.Data;
using Pizzeria.Data.Models;
using Pizzeria.Logic.BllInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pizzeria.Logic.Bll.PizzaBll
{
    public class PizzaBll : BllBase, IPizzaBll
    {
        private readonly AppDBContext dBContext;
        private readonly IIngredientesPizzaBll ingredientesPizzaBll;

        public PizzaBll(AppDBContext dBContext, IIngredientesPizzaBll ingredientesPizzaBll)
        {
            this.dBContext = dBContext;
            this.ingredientesPizzaBll = ingredientesPizzaBll;
        }

        public async Task<BllResult> AddPizza(Pizza pizza)
        {
            try
            {
                this.dBContext.Pizzas.Add(pizza);
                await this.dBContext.SaveChangesAsync();
                this.SetResponseOK();
                return this.OperationResult;
            }
            catch(Exception e)
            {
                this.SetResponseFail("Error al guardar los datos");
                return this.OperationResult;
            }
        }

        public async Task<BllResult> DeletePizza(int pizzaId)
        {
            try
            {
                var pizza = this.dBContext.Pizzas.Where(x => x.Id == pizzaId).FirstOrDefault();
                this.dBContext.Pizzas.Remove(pizza);
                await this.dBContext.SaveChangesAsync();

                this.SetResponseOK();
                return this.OperationResult;
            }
            catch (Exception)
            {
                this.SetResponseFail("Error al eliminar la pizza");
                return this.OperationResult;
            }
        }

        public BllResult GetPizza(int pizzaId)
        {
            try
            {
                var ingredientes = this.ingredientesPizzaBll.GetIngredientesInPizza(pizzaId).Data;
                var pizza = this.dBContext.Pizzas.Where(x => x.Id == pizzaId)
                    .Include(x => x.IngredientePizzas)
                    .ThenInclude(y => y.ingrediente)
                    .FirstOrDefault();
                this.OperationResult.Data = new { pizza.Id, pizza.Image, pizza.Nombre, pizza.Costo, ingredientes};
                this.SetResponseOK();
                if (pizza == null)
                    this.SetResponseFail("No se encuentra la pizza");
                return this.OperationResult;
            }
            catch (Exception e)
            {
                this.SetResponseFail("Error al buscar el dato");
                return this.OperationResult;
            }
        }

        public BllResult GetPizzas()
        {
            try
            {
                var pizzas = this.dBContext.Pizzas.ToList();
                this.OperationResult.Data = pizzas;
                this.SetResponseOK();
                if (pizzas.Count == 0)
                    this.OperationResult.Data = null;
                return this.OperationResult;
            }
            catch (Exception e)
            {
                this.SetResponseFail("Error al obtener los datos");
                return this.OperationResult;
            }
        }

        public BllResult GetPizzasWithIngredients()
        {
            try
            {
                List<Object> pizzas = new List<Object>();
                var nPizzas = this.dBContext.Pizzas.Select(x=> x.Id).ToList();
                foreach(var pId in nPizzas)
                {
                    var data = this.GetPizza(pId);
                    pizzas.Add(data.Status ? data.Data : null);
                }
                this.OperationResult.Data = pizzas;
                this.SetResponseOK();
                if (pizzas.Count == 0)
                    this.OperationResult.Data = null;
                return this.OperationResult;
            }
            catch (Exception)
            {
                this.SetResponseFail("Erro al obtener los datos");
                return this.OperationResult;
            }
        }

        public async Task<BllResult> UpdatePizza(Pizza pizza, int pizzaId)
        {
            try
            {
                pizza.Id = pizzaId;
                this.dBContext.Entry(pizza).State = EntityState.Modified;
                await this.dBContext.SaveChangesAsync();
                this.SetResponseOK();
                return this.OperationResult;
            }
            catch (Exception)
            {
                this.SetResponseFail("Error al actualizar la pizza");
                return this.OperationResult;
            }
        }
    }
}
