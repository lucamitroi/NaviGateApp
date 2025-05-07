using NaviGateAPI.Models;

namespace NaviGateAPI.Dtos;

public partial class ShipToEditDto
{
    public int ShipId { get; set; }
    public string ShipName { get; set; }
    public decimal MaxSpeed { get; set; }


    public ShipToEditDto()
    {
        ShipName ??= "";
    }
}