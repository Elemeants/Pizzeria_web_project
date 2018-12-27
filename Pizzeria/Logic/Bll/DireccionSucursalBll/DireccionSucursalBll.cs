using ApiBobinaTesla.Bll;
using Pizzeria.Data;
using Pizzeria.Data.Models;
using Pizzeria.Logic.BllInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pizzeria.Logic.Bll.DireccionSucursalBll
{
    public class DireccionSucursalBll : BllBase, IDireccionSucursalBll
    {
        private readonly AppDBContext dBContext;

        public DireccionSucursalBll(AppDBContext dBContext)
        {
            this.dBContext = dBContext;
        }
        public async Task<BllResult> SetDirToSucursal(int direccionId, int SucursalId)
        {
            try
            {
                var sucursal = this.dBContext.Sucursales.Where(x => x.Id == SucursalId).FirstOrDefault();
                sucursal.AddressId = direccionId;
                this.dBContext.Sucursales.Update(sucursal);
                await this.dBContext.SaveChangesAsync();
                this.SetResponseOK();
                return this.OperationResult;
            }
            catch (Exception)
            {
                this.SetResponseFail("No se pudo añadir la direccion");
                return this.OperationResult;
            }
        }

        public async Task<BllResult> DeleteDirFromSucursal(int SucursalId)
        {
            try
            {
                var sucursal = this.dBContext.Sucursales.Where(x => x.Id == SucursalId).FirstOrDefault();
                sucursal.AddressId = null;
                this.dBContext.Sucursales.Update(sucursal);
                await this.dBContext.SaveChangesAsync();
                this.SetResponseOK();
                return this.OperationResult;
            }
            catch (Exception)
            {
                this.SetResponseFail("No se pudo añadir la direccion");
                return this.OperationResult;
            }
        }
    }
}
