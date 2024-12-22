using Domain.Interfaces;
using Infrastructure.Data;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Application.UseCases.Interfaces;
using Application.UseCases;

var builder = WebApplication.CreateBuilder(args);

string connection = builder.Configuration.GetConnectionString("DefaultConnection")!;

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppCrimeMapContext>(
    options => options.UseNpgsql(connection)
);
builder.Services.AddScoped<ICrimeReportRepository, CrimeReportRepository>();
builder.Services.AddScoped<ICreateCrimeUseCase, CreateCrimeUseCase>();
builder.Services.AddScoped<IGetAllCrimeUseCase, GetAllCrimeUseCase>();
builder.Services.AddScoped<IGetCrimeUseCase, GetCrimeUseCase>();
builder.Services.AddScoped<IUpdateCrimeUseCase, UpdateCrimeUseCase>();

var app = builder.Build();

app.UseCors(builder => builder.WithOrigins("http://localhost:3000")
                            .AllowAnyHeader()
                            .AllowAnyMethod());

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
