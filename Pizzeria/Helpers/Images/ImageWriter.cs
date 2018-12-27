using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Pizzeria.Helpers.Images
{
    public class ImageWriter : IImageWriter
    {
        public async Task<bool> UploadImage(IFormFile file, string path)
        {
            if (CheckIfImageFile(file))
            {
                return await WriteFile(file, path);
            }
            return false;
        }

        private bool CheckIfImageFile(IFormFile file)
        {
            byte[] fileBytes;
            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                fileBytes = ms.ToArray();
            }

            return WriterHelper.GetImageFormat(fileBytes) != WriterHelper.ImageFormat.unknown;
        }

        public async Task<bool> WriteFile(IFormFile file, string path)
        {
            string fileName;
            try
            {
                var extension = "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1];
                fileName = file.FileName;
                var pathroot = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot\\Image", path, fileName);

                using (var bits = new FileStream(pathroot, FileMode.Create))
                {
                    await file.CopyToAsync(bits);
                }
            }
            catch (Exception e)
            {
                return false;
            }

            return true;
        }
    }
}
