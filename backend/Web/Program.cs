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
using Application.Filters;

var builder = WebApplication.CreateBuilder(args);

string connection = Environment.GetEnvironmentVariable("CONNECTION_STRING") ?? builder.Configuration.GetConnectionString("DefaultConnection")!;

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowClientCrimeMapApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
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


builder.Services.AddScoped<IFilter<Crime>, SearchQueryFilter>();
builder.Services.AddScoped<IFilter<Crime>, CrimeTypeFilter>();
builder.Services.AddScoped<IFilter<Crime>, RadiusFilter>();
builder.Services.AddScoped<IFilter<Crime>, DateRangeFilter>();

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

app.Run();
