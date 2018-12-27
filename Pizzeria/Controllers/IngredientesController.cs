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
    [Route("api/Ingredientes")]
    [ApiController]
    public class IngredientesController : ControllerBase
    {
        private readonly IIngredienteBll ingredienteBll;

        public IngredientesController(IIngredienteBll ingredienteBll)
        {
            this.ingredienteBll = ingredienteBll;
        }
        [HttpDelete("{ingredienteId}")]
        public async Task<IActionResult> Delete([FromRoute] int ingredienteId)
        {
            var result = await this.ingredienteBll.Delete(ingredienteId);
            if (!result.Status)
                return BadRequest(result.Message);
            return Ok();
        }
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Ingrediente ingrediente)
        {
            var result = await this.ingredienteBll.Add(ingrediente);
            if (!result.Status)
                return BadRequest(result.Message);
            return Ok();
        }
        [HttpPut("{ingredienteId}")]
        public async Task<IActionResult> Update([FromBody] Ingrediente ingrediente, [FromRoute] int ingredienteId)
        {
            var result = await this.ingredienteBll.Update(ingrediente, ingredienteId);
            if (!result.Status)
                return BadRequest(result.Message);
            return Ok();
        }
        [HttpGet]
        public ActionResult<IEnumerable<Object>> GetAll()
        {
            var result = this.ingredienteBll.GetAll();
            if (!result.Status)
                return BadRequest(result.Message);
            return Ok(result.Data);
        }

        [HttpGet("{ingredienteId}")]
        public ActionResult<Object> Get([FromRoute] int direccionId)
        {
            var result = this.ingredienteBll.Get(direccionId);
            if (!result.Status)
                return BadRequest(result.Message);
            return Ok(result.Data);
        }
    }
}