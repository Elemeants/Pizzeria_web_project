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
    [Route("api/Direcciones")]
    [ApiController]
    public class DireccionesController : ControllerBase
    {
        private readonly IDireccionBll direccionBll;

        public DireccionesController(IDireccionBll direccionBll)
        {
            this.direccionBll = direccionBll;
        }

        [HttpDelete("{direccionId}")]
        async Task<IActionResult> Delete([FromRoute] int direccionId)
        {
            var result = await this.direccionBll.Delete(direccionId);
            if (!result.Status)
                return BadRequest(result.Message);
            return Ok();
        }
        [HttpPost]
        async Task<IActionResult> Add([FromBody] Address direccion)
        {
            var result = await this.direccionBll.Add(direccion);
            if (!result.Status)
                return BadRequest(result.Message);
            return Ok();
        }
        [HttpPut("{direccionId}")]
        async Task<IActionResult> Update([FromBody] Address direccion, [FromRoute] int direccionId)
        {
            var result = await this.direccionBll.Update(direccion, direccionId);
            if (!result.Status)
                return BadRequest(result.Message);
            return Ok();
        }

        [HttpGet]
        ActionResult<IEnumerable<Address>> GetAll()
        {
            var result = this.direccionBll.GetAll();
            if (!result.Status)
                return BadRequest(result.Message);
            return Ok();
        }
        [HttpGet("{direccionId}")]
        ActionResult<Address> Get([FromRoute] int direccionId)
        {
            var result = this.direccionBll.Get(direccionId);
            if (!result.Status)
                return BadRequest(result.Message);
            return Ok();
        }
    }
}