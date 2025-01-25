using Domain.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Application.Services.Interfaces;
using Application.Services;
using Application.UseCases.GetAllCrimes;
using Application.UseCases.GetCrime;
using Application.UseCases.CreateCrime;
using Application.UseCases.UpdateCrime;
using Application.UseCases.DeleteCrime;
using Application.UseCases.SelectAllCrimeTypes;
using Application.UseCases.GetCrimeType;
using Application.UseCases.SelectAllWantedPersons;
using Application.UseCases.GetWantedPerson;
using Application.UseCases.CreateCrimeType;
using Application.UseCases.UpdateCrimeType;
using Application.UseCases.DeleteCrimeType;
using Application.UseCases.CreateWantedPerson;
using Application.UseCases.UpdateWantedPerson;
using Application.UseCases.DeleteWantedPerson;
using Application.UseCases.GetAllCrimeTypes;
using Application.UseCases.GetAllWantedPerson;
using Application.Filters.CrimeFilters;
using Application.Filters.WantedPersonFilters;
using Application.Filters.CrimeTypeFilters;
using Web.Hubs;
var builder = WebApplication.CreateBuilder(args);

string connection = Environment.GetEnvironmentVariable("CONNECTION_STRING") ?? builder.Configuration.GetConnectionString("DefaultConnection")!;
var allowedOrigins = Environment.GetEnvironmentVariable("ALLOWED_ORIGINS");
var originsArray = allowedOrigins?.Split(',', StringSplitOptions.RemoveEmptyEntries) ?? ["http://localhost:3000", "https://localhost:3000"];

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowClientCrimeMapApp", policy =>
    {
        policy.WithOrigins(originsArray)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddDbContext<AppCrimeMapContext>(
    options => options.UseNpgsql(connection,
        x => x.UseNetTopologySuite())
);

builder.Services.AddScoped<ICrimeMarkRepository, CrimeMarkRepository>();
builder.Services.AddScoped<ICrimeTypeRepository, CrimeTypeRepository>();
builder.Services.AddScoped<IWantedPersonRepository, WantedPersonRepository>();

builder.Services.AddScoped<IGetAllCrimesUseCase, GetAllCrimesUseCase>();
builder.Services.AddScoped<IGetCrimeUseCase, GetCrimeUseCase>();
builder.Services.AddScoped<ICreateCrimeUseCase, CreateCrimeUseCase>();
builder.Services.AddScoped<IUpdateCrimeUseCase, UpdateCrimeUseCase>();
builder.Services.AddScoped<IDeleteCrimeUseCase, DeleteCrimeUseCase>();

builder.Services.AddScoped<ICreateCrimeService, CreateCrimeService>();

builder.Services.AddScoped<ISelectAllCrimeTypesUseCase, SelectAllCrimeTypesUseCase>();
builder.Services.AddScoped<IGetAllCrimeTypesUseCase, GetAllCrimeTypesUseCase>();
builder.Services.AddScoped<IGetCrimeTypeUseCase, GetCrimeTypeUseCase>();
builder.Services.AddScoped<ICreateCrimeTypeUseCase, CreateCrimeTypeUseCase>();
builder.Services.AddScoped<IUpdateCrimeTypeUseCase, UpdateCrimeTypeUseCase>();
builder.Services.AddScoped<IDeleteCrimeTypeUseCase, DeleteCrimeTypeUseCase>();

builder.Services.AddScoped<ISelectAllWantedPersonsUseCase, SelectAllWantedPersonsUseCase>();
builder.Services.AddScoped<IGetAllWantedPersonUseCase, GetAllWantedPersonUseCase>();
builder.Services.AddScoped<IGetWantedPersonUseCase, GetWantedPersonUseCase>();
builder.Services.AddScoped<ICreateWantedPersonUseCase, CreateWantedPersonUseCase>();
builder.Services.AddScoped<IUpdateWantedPersonUseCase, UpdateWantedPersonUseCase>();
builder.Services.AddScoped<IDeleteWantedPersonUseCase, DeleteWantedPersonUseCase>();


builder.Services.AddScoped<IRequestFilter<Crime>, SearchQueryFilter>();
// builder.Services.AddScoped<IRequestFilter<Crime>, SelectCrimeByOneTypeFilter>(); // if select one type
builder.Services.AddScoped<IRequestFilter<Crime>, SelectCrimesByMultipleTypesFilter>(); // if select more types
builder.Services.AddScoped<IRequestFilter<Crime>, RadiusFilter>();
builder.Services.AddScoped<IRequestFilter<Crime>, DateRangeFilter>();
builder.Services.AddScoped<IRequestFilter<Crime>, SelectCrimesByMultiplePersonsFilter>();

builder.Services.AddScoped<ISearchFilter<WantedPerson>, WantedPersonsSearchFilter>();
builder.Services.AddScoped<ISearchFilter<CrimeType>, CrimeTypesSearchFilter>();

var app = builder.Build();

app.UseCors("AllowClientCrimeMapApp");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<RealHub>("/realhub");

app.Run();
