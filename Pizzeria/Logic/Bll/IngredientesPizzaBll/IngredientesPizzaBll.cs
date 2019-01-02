using ApiBobinaTesla.Bll;
using Microsoft.EntityFrameworkCore;
using Pizzeria.Data;
using Pizzeria.Data.Models;
using Pizzeria.Logic.BllInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pizzeria.Logic.Bll.IngredientesPizzaBll
{
    public class IngredientesPizzaBll : BllBase, IIngredientesPizzaBll
    {
        private readonly AppDBContext dBContext;

        public IngredientesPizzaBll(AppDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        public async Task<BllResult> AddIngredienteToPizza(int pizzaId, int ingredienteId)
        {
            try
            {
                this.dBContext.IngredientePizzas.Add(new IngredientePizza() { PizzaId = pizzaId, IngredienteId = ingredienteId });
                await this.dBContext.SaveChangesAsync();
                this.SetResponseOK();
                return this.OperationResult;
            }
            catch (Exception e)
            {
                this.SetResponseFail("No se pudo añadir el dato");
                return this.OperationResult;
            }
        }

        public async Task<BllResult> DeleteIngredienteFromPizza(int pizzaId, int ingredienteId)
        {
            try
            {
                var entry = this.dBContext.IngredientePizzas.Where(item => item.IngredienteId == ingredienteId && item.PizzaId == pizzaId).FirstOrDefault();
                this.dBContext.IngredientePizzas.Remove(entry);
                await this.dBContext.SaveChangesAsync();
                this.SetResponseOK();
                return this.OperationResult;
            }
            catch (Exception)
            {
                this.SetResponseFail("Error al eliminar el ingrediente de la pizza");
                return this.OperationResult;
            }
        }

        public BllResult GetIngredientesInPizza(int pizzaId)
        {
            try
            {
                var ingredientes = this.dBContext.IngredientePizzas.Include(x => x.ingrediente).Where(x => x.PizzaId == pizzaId).Select(x => x.ingrediente).ToList();
                this.OperationResult.Data = ingredientes;
                this.SetResponseOK();
                return this.OperationResult;
            }
            catch (Exception)
            {
                this.SetResponseFail("No se pudo obtener la lista de ingredientes");
                return this.OperationResult;
            }
        }
    }
}
