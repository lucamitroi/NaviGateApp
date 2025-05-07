using NaviGateAPI.Models;

namespace NaviGateAPI.Dtos;

public partial class ShipDto
{
    public int ShipId { get; set; }
    public int UserId { get; set; }
    public string ShipName { get; set; }
    public decimal MaxSpeed { get; set; }
    public IEnumerable<VoyagesDto> ListOfVoyages { get; set; }
    public IEnumerable<PortsDto> ListOfPorts { get; set; }
    public IEnumerable<CountriesDto> ListOfCountries { get; set; }

    public ShipDto()
    {
        ShipName ??= "";
        ListOfVoyages = [];
        ListOfPorts = [];
        ListOfCountries = [];
    }
}