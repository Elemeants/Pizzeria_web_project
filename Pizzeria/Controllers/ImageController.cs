using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using Pizzeria.Logic.ImageHandler;

namespace Pizzeria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IImageHandler imageHandler;

        public ImageController(IImageHandler imageHandler)
        {
            this.imageHandler = imageHandler;
        }

        [HttpPost("{pathFile}")]
        public async Task<IActionResult> Uploadimage(IFormFile file, [FromRoute] string pathFile)
        {
            return await this.imageHandler.UploadImage(file, pathFile);
        }

        [HttpDelete("{pathFile}/{Filename}")]
        public IActionResult Uploadimage([FromRoute] string pathFile, [FromRoute] string Filename)
        {
            return this.imageHandler.DeleteImage(Filename, pathFile);
        }
    }
}