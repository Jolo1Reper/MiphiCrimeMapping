using Application.UseCases.GetAllCrimes;
using Application.UseCases.GetAllCrimeTypes;
using Application.UseCases.GetAllWantedPerson;
using Microsoft.AspNetCore.SignalR;

namespace Web.Hubs
{
    public class RealHub : Hub
    {
        public async Task AddingCrime(ShowOnMapCrimeResponse crimeDto)
        {
            if (crimeDto == null)
            {
                await Clients.Caller.SendAsync("Error", "Invalid request for add crime");
                return;
            }

            await Clients.Others.SendAsync("AddedCrime", crimeDto);
        }

        public async Task UpdatingCrime(ShowOnMapCrimeResponse crimeDto)
        {
            if (crimeDto == null)
            {
                await Clients.Caller.SendAsync("Error", "Invalid request for update crime");
                return;
            }

            await Clients.Others.SendAsync("UpdatedCrime", crimeDto);
        }

        public async Task DeletingCrime(Guid? id)
        {
            if (id == null)
            {
                await Clients.Caller.SendAsync("Error", "Invalid request for delete crime");
                return;
            }

            await Clients.Others.SendAsync("DeletedCrime", id);
        }

        public async Task AddingType(GetAllCrimeTypesResponse crimeTypeDto)
        {
            if (crimeTypeDto == null)
            {
                await Clients.Caller.SendAsync("Error", "Invalid request for add crime type");
                return;
            }

            await Clients.Others.SendAsync("AddedType", crimeTypeDto);
        }

        public async Task UpdatingType(GetAllCrimeTypesResponse crimeTypeDto)
        {
            if (crimeTypeDto == null)
            {
                await Clients.Caller.SendAsync("Error", "Invalid request for update crime type");
                return;
            }

            await Clients.Others.SendAsync("UpdatedType", crimeTypeDto);
        }

        public async Task DeletingType(Guid? id)
        {
            if (id == null)
            {
                await Clients.Caller.SendAsync("Error", "Invalid request for delete crime type");
                return;
            }

            await Clients.Others.SendAsync("DeletedType", id);
        }

        public async Task AddingWantedPerson(GetAllWantedPersonResponse wantedPersonDto)
        {
            if (wantedPersonDto == null)
            {
                await Clients.Caller.SendAsync("Error", "Invalid request for add wanted person");
                return;
            }

            await Clients.Others.SendAsync("AddedWantedPerson", wantedPersonDto);
        }

        public async Task UpdatingWantedPerson(GetAllWantedPersonResponse wantedPersonDto)
        {
            if (wantedPersonDto == null)
            {
                await Clients.Caller.SendAsync("Error", "Invalid request for update wanted person");
                return;
            }

            await Clients.Others.SendAsync("UpdatedWantedPerson", wantedPersonDto);
        }

        public async Task DeletingWantedPerson(Guid? id)
        {
            if (id == null)
            {
                await Clients.Caller.SendAsync("Error", "Invalid request for delete wanted person");
                return;
            }

            await Clients.Others.SendAsync("DeletedWantedPerson", id);
        }
    }
}
