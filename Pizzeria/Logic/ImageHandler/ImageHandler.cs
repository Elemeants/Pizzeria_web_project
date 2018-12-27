using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pizzeria.Helpers.Images;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pizzeria.Logic.ImageHandler
{
    public class ImageHandler : IImageHandler
    {
        private readonly IImageWriter _imageWriter;
        public ImageHandler(IImageWriter imageWriter)
        {
            _imageWriter = imageWriter;
        }

        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            return await this.UploadImage(file, "");
        }

        public async Task<IActionResult> UploadImage(IFormFile file, string path)
        {
            var result = await _imageWriter.UploadImage(file, path);
            return new StatusCodeResult(result ? 200: 400);
        }
    }
}
