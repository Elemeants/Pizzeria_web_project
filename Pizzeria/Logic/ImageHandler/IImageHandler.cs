using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pizzeria.Logic.ImageHandler
{
    public interface IImageHandler
    {
        Task<IActionResult> UploadImage(IFormFile file);
        Task<IActionResult> UploadImage(IFormFile file, string path);
    }
}
