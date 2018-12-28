using ApiBobinaTesla.Bll;
using Microsoft.EntityFrameworkCore;
using Pizzeria.Data;
using Pizzeria.Data.Models;
using Pizzeria.Logic.BllInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pizzeria.Logic.Bll.PizzasSucursalBll
{
    public class PizzasSucursalBll : BllBase, IPizzasSucursalBll
    {
        private readonly AppDBContext dBcontext;

        public PizzasSucursalBll(AppDBContext dBcontext)
        {
            this.dBcontext = dBcontext;
        }

        public async Task<BllResult> AddPizzaToSucursal(int sucursalId, int pizzaId)
        {
            try
            {
                var pizzasSucursal = new PizzasSucursal()
                {
                    PizzaId = pizzaId,
                    SucursalId = sucursalId
                };
                this.dBcontext.PizzasSucursals.Add(pizzasSucursal);
                await this.dBcontext.SaveChangesAsync();
                this.SetResponseOK();
                return this.OperationResult;
            }
            catch (Exception e)
            {
                this.SetResponseFail("Error al guardar el dato");
                return this.OperationResult;
            }
        }

        public async Task<BllResult> DeletePizzaFromSucursal(int sucursalId, int pizzaId)
        {
            try
            {
                var entry = this.dBcontext.PizzasSucursals.Where(x => x.SucursalId == sucursalId && x.PizzaId == pizzaId).FirstOrDefault();
                this.dBcontext.PizzasSucursals.Remove(entry);
                await this.dBcontext.SaveChangesAsync();
                this.SetResponseOK();
                return this.OperationResult;
            }
            catch (Exception e)
            {
                this.SetResponseFail("No se pudo eliminar la pizza de la sucursal");
                return this.OperationResult;
            }
        }

        public BllResult GetPizzaInSucursal(int sucursalId, int pizzaId)
        {
            try
            {
                var pizza = this.dBcontext.PizzasSucursals
                    .Where(x => x.SucursalId == sucursalId).Include(x => x.pizza)
                    .Where(x => x.PizzaId == pizzaId).Select(x => x.pizza).FirstOrDefault();
                this.OperationResult.Data = pizza;
                this.SetResponseOK();
                if (pizza == null)
                    this.SetResponseFail("No existe la pizza");
                return this.OperationResult;
            }
            catch (Exception)
            {
                this.SetResponseFail("Error al obtener la pizza");
                return this.OperationResult;
            }
        }

        public BllResult GetSucursalesFromPizza(int pizzaId)
        {
            try
            {
                var sucursals = this.dBcontext.PizzasSucursals
                    .Where(x => x.PizzaId == pizzaId)
                    .Include(x => x.sucursal).ThenInclude(x => x.Direccion)
                    .Select(x => x.sucursal).ToList();
                this.OperationResult.Data = sucursals;
                this.SetResponseOK();
                if (sucursals.Count() == 0)
                    this.OperationResult.Data = null;
                return this.OperationResult;
            }
            catch (Exception)
            {
                this.SetResponseFail("Error al obtener las sucursales");
                return this.OperationResult;
            }
        }

        public BllResult GetPizzasInSucursal(int sucursalId)
        {
            try
            {
                var pizzasSucursal = this.dBcontext.PizzasSucursals
                    .Where(x => x.SucursalId == sucursalId)
                    .Include(x => x.pizza)
                    .Select(x => x.pizza).ToList();
                this.OperationResult.Data = pizzasSucursal;
                this.SetResponseOK();
                if (pizzasSucursal.Count() == 0)
                    this.OperationResult.Data = null;
                return this.OperationResult;
            }
            catch (Exception)
            {
                this.SetResponseFail("Error al obtener las pizzas");
                return this.OperationResult;
            }
        }
    }
}
