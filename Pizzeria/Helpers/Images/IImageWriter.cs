using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pizzeria.Helpers.Images
{
    public interface IImageWriter
    {
        Task<bool> UploadImage(IFormFile file, string path);
        bool DeleteImage(string Filename, string path);
    }
}
