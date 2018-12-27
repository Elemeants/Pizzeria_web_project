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
    [Route("api/Pizzas/{pizzaId}")]
    [ApiController]
    public class ActionsPizzaController : ControllerBase
    {
        private readonly IIngredientesPizzaBll ingredientesPizzaBll;
        private readonly IPizzasSucursalBll pizzasSucursalBll;

        public ActionsPizzaController(IIngredientesPizzaBll ingredientesPizzaBll,
            IPizzasSucursalBll pizzasSucursalBll)
        {
            this.ingredientesPizzaBll = ingredientesPizzaBll;
            this.pizzasSucursalBll = pizzasSucursalBll;
        }

        [HttpGet("Sucursales")]
        public ActionResult<IEnumerable<Sucursal>> GetSucursalesWhereIsPizza([FromRoute] int pizzaId)
        {
            var result = this.pizzasSucursalBll.GetSucursalesFromPizza(pizzaId);
            if (!result.Status)
                return BadRequest(result.Message);
            return Ok(result.Data);
        }

        [HttpPost("{ingredienteId}")]
        public async Task<IActionResult> AddIngredienteToPizza([FromRoute] int pizzaId, [FromRoute] int ingredienteId)
        {
            var result = await this.ingredientesPizzaBll.AddIngredienteToPizza(pizzaId, ingredienteId);
            if (!result.Status)
                return BadRequest(result.Message);
            return Ok();
        }
        [HttpDelete("{ingredienteId}")]
        public async Task<IActionResult> DeleteIngredienteToPizza([FromRoute] int pizzaId, [FromRoute] int ingredienteId)
        {
            var result = await this.ingredientesPizzaBll.DeleteIngredienteFromPizza(pizzaId, ingredienteId);
            if (!result.Status)
                return BadRequest(result.Message);
            return Ok();
        }
        [HttpGet("Ingredientes")]
        public ActionResult<IEnumerable<Ingrediente>> GetPizzaWithIngredientes([FromRoute] int pizzaId)
        {
            var result = this.ingredientesPizzaBll.GetIngredientesInPizza(pizzaId);
            if (!result.Status)
                return BadRequest(result.Message);
            return Ok(result.Data);
        }
    }
}