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
    [Route("api/[controller]")]
    [ApiController]
    public class SucursalesController : ControllerBase
    {
        private readonly ISucursalBll sucursalBll;
        private readonly IPizzaBll pizzaBll;

        public SucursalesController(ISucursalBll sucursalBll, IPizzaBll pizzaBll)
        {
            this.sucursalBll = sucursalBll;
            this.pizzaBll = pizzaBll;
        }

        [HttpGet("{id}")]
        public ActionResult<Object> GetSucursal([FromRoute] int id)
        {
            var result = this.sucursalBll.GetSucursal(id);
            if (!result.Status)
                return BadRequest(result.Message);
            return Ok(result.Data);
        }

        [HttpGet("Search/{nombre}")]
        public ActionResult<Object> GetSucursalByName([FromRoute] string nombre)
        {
            var result = this.sucursalBll.GetSucursalByName(nombre);
            if (!result.Status)
                return BadRequest(result.Message);
            return Ok(result.Data);
        }

        [HttpGet]
        public ActionResult<IEnumerable<Object>> GetSucursales()
        {
            var result = this.sucursalBll.GetSurcursales();
            if (!result.Status)
                return BadRequest(result.Message);
            return Ok(result.Data);
        }

        [HttpPost]
        public async Task<IActionResult> AddSucursal([FromBody] Sucursal sucursal)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var result = await this.sucursalBll.AddSucursal(sucursal);
            if (result.Status)
            {
                return Ok(sucursal);
            }
            return BadRequest(result.Message);
        }
    }
}