using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiBobinaTesla.Bll;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pizzeria.Data;
using Pizzeria.Data.Models;
using Pizzeria.Logic.BllInterfaces;

namespace Pizzeria.Controllers
{
    [Produces("application/json")]
    [Route("api/Pizzas")]
    [ApiController]
    public class PizzasController : ControllerBase
    {
        private readonly IPizzaBll pizzaBll;
        /**
         * Building a automatic Function to the same validation from the BllResult functions...
        
        public ActionResult DefaultFunctionInt(Func<object, BllResult> function, object param)
        {
            var result = function(param);
            if (!result.Status)
                return BadRequest(result.Message);
            return Ok(result.Data);
        }

         */
        public PizzasController(IPizzaBll pizzaBll)
        {
            this.pizzaBll = pizzaBll;
        }

        [HttpGet("{pizzaId}")]
        public ActionResult<Object> GetPizza([FromRoute] int pizzaId)
        {
            var result = this.pizzaBll.GetPizza(pizzaId);
            if (!result.Status)
                return BadRequest(result.Message);
            return Ok(result.Data);
        }
        [HttpGet]
        public ActionResult<IEnumerable<Pizza>> GetPizzas() 
        {
            var result = this.pizzaBll.GetPizzas();
            if (!result.Status)
                return BadRequest(result.Message);
            return Ok(result.Data);
        }
        [HttpGet("Ingredientes")]
        public ActionResult<IEnumerable<Pizza>> GetPizzaswithIngredientes()
        {
            var result = this.pizzaBll.GetPizzasWithIngredients();
            if (!result.Status)
                return BadRequest(result.Message);
            return Ok(result.Data);
        }
        [HttpPost]
        public async Task<IActionResult> AddPizza([FromBody] Pizza pizza)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var result = await this.pizzaBll.AddPizza(pizza);
            if (!result.Status)
                return BadRequest(result.Message);
            return new CreatedAtRouteResult(new { id = pizza.Id }, pizza);
        }
        [HttpDelete("{pizzaId}")]
        public async Task<IActionResult> DeletePizza([FromRoute] int pizzaId)
        {
            var result = await this.pizzaBll.DeletePizza(pizzaId);
            if (!result.Status)
                return BadRequest(result.Message);
            return Ok(result.Data);
        }
        [HttpPut("{pizzaId}")]
        public async Task<IActionResult> UpdatePizza([FromBody] Pizza pizza, [FromRoute] int pizzaId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var result = await this.pizzaBll.UpdatePizza(pizza, pizzaId);
            if (!result.Status)
                return BadRequest(result.Message);
            return Ok(result.Data);
        }
    }
}