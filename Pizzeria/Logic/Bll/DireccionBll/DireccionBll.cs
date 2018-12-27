using ApiBobinaTesla.Bll;
using Microsoft.EntityFrameworkCore;
using Pizzeria.Data;
using Pizzeria.Data.Models;
using Pizzeria.Logic.BllInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pizzeria.Logic.Bll.DireccionBll
{
    public class DireccionBll : BllBase, IDireccionBll
    {
        private readonly AppDBContext dBContext;

        public DireccionBll(AppDBContext dBContext)
        {
            this.dBContext = dBContext;
        }
        public async Task<BllResult> Add(Address direccion)
        {
            try
            {
                this.dBContext.Direcciones.Add(direccion);
                await this.dBContext.SaveChangesAsync();
                this.SetResponseOK();
                return this.OperationResult;
            }
            catch (Exception)
            {
                this.SetResponseFail("No se pudo agregar el elemento");
                return this.OperationResult;
            }
        }

        public async Task<BllResult> Delete(int direccionId)
        {
            try
            {
                var elemento = this.dBContext.Direcciones.Where(x => x.Id == direccionId).FirstOrDefault();
                this.dBContext.Direcciones.Remove(elemento);
                await this.dBContext.SaveChangesAsync();
                this.SetResponseOK();
                return this.OperationResult;
            }
            catch (Exception)
            {
                this.SetResponseFail("No se pudo eliminar el elemento");
                return this.OperationResult;
            }
        }

        public BllResult Get(int direccionId)
        {
            try
            {
                this.OperationResult.Data = this.dBContext.Direcciones.Where(x => x.Id == direccionId).FirstOrDefault();
                if (this.OperationResult.Data == null)
                {
                    this.SetResponseFail("No se encontro el elemento");
                }
                this.SetResponseOK();
                return this.OperationResult;
            }
            catch (Exception)
            {
                this.SetResponseFail("No se pudo leer la DB");
                return this.OperationResult;
            }
        }

        public BllResult GetAll()
        {
            try
            {
                var lista = this.dBContext.Direcciones.ToList();
                this.SetResponseOK();
                if (lista.Count == 0)
                    this.SetResponseFail("No hay elementos");
                this.OperationResult.Data = lista;
                return this.OperationResult;
            }
            catch (Exception)
            {
                this.SetResponseFail("No se pudo leer la DB");
                return this.OperationResult;
            }
        }

        public async Task<BllResult> Update(Address direccion, int direccionId)
        {
            try
            {
                direccion.Id = direccionId;
                this.dBContext.Entry(direccion).State = EntityState.Modified;
                await this.dBContext.SaveChangesAsync();
                this.SetResponseOK();
                return this.OperationResult;
            }
            catch (Exception)
            {
                this.SetResponseFail("No se pudo actualizar el elemento");
                return this.OperationResult;
            }
        }
    }
}
