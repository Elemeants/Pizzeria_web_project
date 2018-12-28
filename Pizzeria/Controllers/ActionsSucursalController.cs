using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pizzeria.Data.Models;
using Pizzeria.Logic.BllInterfaces;

namespace Pizzeria.Controllers
{
    [Produces("application/json")]
    [Route("api/Sucursales/{sucursalId}")]
    [ApiController]
    public class ActionsSucursalController : ControllerBase
    {
        private readonly IPizzasSucursalBll pizzasSucursalBll;
        private readonly IDireccionSucursalBll direccionSucursalBll;

        public ActionsSucursalController(IPizzasSucursalBll pizzasSucursalBll,
            IDireccionSucursalBll direccionSucursalBll)
        {
            this.pizzasSucursalBll = pizzasSucursalBll;
            this.direccionSucursalBll = direccionSucursalBll;
        }

        [HttpPost("{pizzaId}")]
        public async Task<IActionResult> AddPizzaToSucursal([FromRoute] int pizzaId, [FromRoute] int sucursalId)
        {
            var result = await this.pizzasSucursalBll.AddPizzaToSucursal(sucursalId, pizzaId);
            if (!result.Status)
                return BadRequest(result.Message);
            return Ok("Pizza agregada a la sucursal");
        }
        [HttpDelete("{pizzaId}")]
        public async Task<IActionResult> DeletePizzaFromSucursal([FromRoute] int pizzaId, [FromRoute] int sucursalId)
        {
            var result = await this.pizzasSucursalBll.DeletePizzaFromSucursal(sucursalId, pizzaId);
            if (!result.Status)
                return BadRequest(result.Message);
            return Ok("Pizza eliminada de la sucursal");
        }
        [HttpGet("Pizzas")]
        public ActionResult<IEnumerable<Pizza>> GetPizzasInSucursal([FromRoute] int sucursalId)
        {
            var result = this.pizzasSucursalBll.GetPizzasInSucursal(sucursalId);
            if (!result.Status)
                return BadRequest(result.Message);
            return Ok(result.Data);
        }
        [HttpPut("Direccion/{direccionId}")]
        public async Task<IActionResult> SetDireccionSucursal([FromRoute] int sucursalId, [FromRoute] int direccionId)
        {
            var result = await this.direccionSucursalBll.SetDirToSucursal(direccionId, sucursalId);
            if (!result.Status)
                return BadRequest(result.Message);
            return Ok(result.Data);
        }
        [HttpDelete("Direccion")]
        public async Task<IActionResult> DelDireccionSucursal([FromRoute] int sucursalId, [FromRoute] int direccionId)
        {
            var result = await this.direccionSucursalBll.DeleteDirFromSucursal(sucursalId);
            if (!result.Status)
                return BadRequest(result.Message);
            return Ok(result.Data);
        }
    }
}