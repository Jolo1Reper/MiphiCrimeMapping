using Domain.Interfaces;
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
using Application.UseCases.GetAllCrimeTypes;
using Application.UseCases.GetCrimeType;
using Application.UseCases.GetAllWantedPersons;
using Application.UseCases.GetWantedPerson;

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
    options => options.UseNpgsql(connection)
);

builder.Services.AddScoped<ICrimeReportRepository, CrimeReportRepository>();

builder.Services.AddScoped<IGetAllCrimesUseCase, GetAllCrimesUseCase>();
builder.Services.AddScoped<IGetCrimeUseCase, GetCrimeUseCase>();
builder.Services.AddScoped<ICreateCrimeUseCase, CreateCrimeUseCase>();
builder.Services.AddScoped<IUpdateCrimeUseCase, UpdateCrimeUseCase>();
builder.Services.AddScoped<IDeleteCrimeUseCase, DeleteCrimeUseCase>();

builder.Services.AddScoped<ICreateCrimeService, CreateCrimeService>();

builder.Services.AddScoped<IGetAllCrimeTypesUseCase, GetAllCrimeTypesUseCase>();
builder.Services.AddScoped<IGetCrimeTypeUseCase, GetCrimeTypeUseCase>();
builder.Services.AddScoped<IGetAllWantedPersonsUseCase, GetAllWantedPersonsUseCase>();
builder.Services.AddScoped<IGetWantedPersonUseCase, GetWantedPersonUseCase>();

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
