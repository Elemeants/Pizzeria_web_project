using ApiBobinaTesla.Bll;
using Microsoft.EntityFrameworkCore;
using Pizzeria.Data;
using Pizzeria.Data.Models;
using Pizzeria.Logic.BllInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pizzeria.Logic.Bll.IngredienteBll
{
    public class IngredienteBll : BllBase, IIngredienteBll
    {
        private readonly AppDBContext dBContext;

        public IngredienteBll(AppDBContext dBContext)
        {
            this.dBContext = dBContext;
        }
        public async Task<BllResult> Add(Ingrediente ingrediente)
        {
            try
            {
                this.dBContext.Ingredientes.Add(ingrediente);
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

        public async Task<BllResult> Delete(int ingredienteId)
        {
            try
            {
                var elemento = this.dBContext.Ingredientes.Where(x => x.Id == ingredienteId).FirstOrDefault();
                this.dBContext.Ingredientes.Remove(elemento);
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

        public BllResult Get(int ingredienteId)
        {
            try
            {
                this.OperationResult.Data = this.dBContext.Ingredientes.Where(x => x.Id == ingredienteId).FirstOrDefault();
                if(this.OperationResult.Data == null)
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
                var lista = this.dBContext.Ingredientes.ToList();
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

        public async Task<BllResult> Update(Ingrediente ingrediente, int ingredienteId)
        {
            try
            {
                ingrediente.Id = ingredienteId;
                this.dBContext.Entry(ingrediente).State = EntityState.Modified;
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
