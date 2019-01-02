using ApiBobinaTesla.Bll;
using Microsoft.EntityFrameworkCore;
using Pizzeria.Data;
using Pizzeria.Data.Models;
using Pizzeria.Logic.BllInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pizzeria.Logic.Bll.SucursalBll
{
    public class SucursalBll : BllBase, ISucursalBll
    {
        private readonly AppDBContext dBContext;
        private readonly IPizzasSucursalBll pizzasSucursalBll;

        public SucursalBll(AppDBContext dBContext, IPizzasSucursalBll pizzasSucursalBll)
        {
            this.dBContext = dBContext;
            this.pizzasSucursalBll = pizzasSucursalBll;
        }

        public async Task<BllResult> AddSucursal(Sucursal sucursal)
        {
            try
            {
                this.dBContext.Sucursales.Add(sucursal);
                await this.dBContext.SaveChangesAsync();
                this.SetResponseOK();
                return this.OperationResult;
            }
            catch (Exception)
            {
                this.SetResponseFail("Error al guardar el dato");
                return this.OperationResult;
            }
        }

        public BllResult GetSucursal(int sucursalId)
        {
            try
            {
                var pizzas = this.pizzasSucursalBll.GetPizzasInSucursal(sucursalId).Data;
                var Sucursal = this.dBContext.Sucursales.Where(x => x.Id == sucursalId)
                    .Include(x => x.Direccion)
                    .FirstOrDefault();
                this.OperationResult.Data = new { Sucursal.Id, Sucursal.Nombre, Sucursal.Telefono, Sucursal.Direccion, pizzas };
                this.SetResponseOK();
                if(Sucursal == null)
                {
                    this.SetResponseFail("No existe la sucursal");
                }
                return this.OperationResult;
            }
            catch (Exception)
            {
                this.SetResponseFail("Error al obtener la DB");
                return this.OperationResult;
            }
        }

        public BllResult GetSurcursales()
        {
            try
            {
                var sucursales = this.dBContext.Sucursales.Include(x => x.Direccion).ToList();
                this.OperationResult.Data = sucursales;
                this.SetResponseOK();
                if (sucursales.Count == 0)
                    this.SetResponseFail("No hay sucursales guardadas");
                return this.OperationResult;
            }
            catch (Exception)
            {
                this.SetResponseFail("Error en la DB");
                return this.OperationResult;
            }
        }

        public BllResult GetSurcursalesWithDetails()
        {
            try
            {
                List<Object> sucursales = new List<Object>();
                var nSucursales = this.dBContext.Sucursales.Select(x => x.Id).ToList();
                foreach (var pId in nSucursales)
                {
                    var data = this.pizzasSucursalBll.GetPizzasInSucursal(pId);
                    sucursales.Add(data.Status ? data.Data : null);
                }
                this.OperationResult.Data = sucursales;
                this.SetResponseOK();
                if (sucursales.Count() == 0)
                    this.SetResponseFail("No hay sucursales guardadas");
                return this.OperationResult;
            }
            catch (Exception)
            {
                this.SetResponseFail("Error en la DB");
                return this.OperationResult;
            }
        }
        public async Task<BllResult> DeleteSucursal(int sucursalId)
        {
            try
            {
                var sucursal = this.dBContext.Sucursales.Where(x => x.Id == sucursalId).FirstOrDefault();
                this.dBContext.Sucursales.Remove(sucursal);
                await this.dBContext.SaveChangesAsync();
                this.SetResponseOK();
                return this.OperationResult;
            }
            catch(Exception)
            {
                this.SetResponseFail("Error al eliminar la sucursal");
                return this.OperationResult;
            }
        }

        public async Task<BllResult> UpdateSucursal(Sucursal sucursal, int sucursalId)
        {
            try
            {
                sucursal.Id = sucursalId;
                this.dBContext.Entry(sucursal).State = EntityState.Modified;
                try { this.dBContext.Entry(sucursal.Direccion).State = EntityState.Modified; }
                catch (Exception e){ }
                await this.dBContext.SaveChangesAsync();
                this.SetResponseOK();
                return this.OperationResult;
            }
            catch (Exception)
            {
                this.SetResponseFail("Error al actualizar la Sucursal");
                return this.OperationResult;
            }
        }

        public BllResult GetSucursalByName(string sucursalName)
        {
            try
            {
                var Sucursal = this.dBContext.Sucursales.Where(x => x.Nombre == sucursalName)
                    .Include(x => x.Direccion)
                    .FirstOrDefault();
                var pizzas = this.pizzasSucursalBll.GetPizzasInSucursal(Sucursal.Id).Data;
                this.OperationResult.Data = new { Sucursal.Id, Sucursal.Nombre, Sucursal.Telefono, Sucursal.Direccion, pizzas };
                this.SetResponseOK();
                if (Sucursal == null)
                {
                    this.SetResponseFail("No existe la sucursal");
                }
                return this.OperationResult;
            }
            catch (Exception e)
            {
                this.SetResponseFail("Error al obtener la DB");
                return this.OperationResult;
            }
        }
    }
}
