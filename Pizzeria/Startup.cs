using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Pizzeria.Data;
using Pizzeria.Helpers.Images;
using Pizzeria.Logic.Bll.DireccionBll;
using Pizzeria.Logic.Bll.DireccionSucursalBll;
using Pizzeria.Logic.Bll.IngredienteBll;
using Pizzeria.Logic.Bll.IngredientesPizzaBll;
using Pizzeria.Logic.Bll.PizzaBll;
using Pizzeria.Logic.Bll.PizzasSucursalBll;
using Pizzeria.Logic.Bll.SucursalBll;
using Pizzeria.Logic.BllInterfaces;
using Pizzeria.Logic.ImageHandler;

namespace Pizzeria
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AppDBContext>(
                Options => Options.UseSqlServer(Configuration.GetConnectionString("localDB")
                ));
            // Interfaces to upload images to the server in wwwroot path
            services.AddTransient<IImageWriter, ImageWriter>();
            services.AddTransient<IImageHandler, ImageHandler>();

            // Bll interfaces for Dependecy injection in controllers
            services.AddTransient<IPizzaBll, PizzaBll>();
            services.AddTransient<ISucursalBll, SucursalBll>();
            services.AddTransient<IIngredienteBll, IngredienteBll>();
            services.AddTransient<IIngredientesPizzaBll, IngredientesPizzaBll>();
            services.AddTransient<IPizzasSucursalBll, PizzasSucursalBll>();
            services.AddTransient<IDireccionSucursalBll, DireccionSucursalBll>();
            services.AddTransient<IDireccionBll, DireccionBll>();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddMvc().AddJsonOptions(ConfigureJson);
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }
        private void ConfigureJson(MvcJsonOptions obj)
        {
            obj.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseStaticFiles();
            app.UseHttpsRedirection();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
