namespace NaviGateAPI.Dtos;

public partial class ShipToAddDto
{
    public int UserId { get; set; }
    public string ShipName { get; set; }
    public decimal MaxSpeed { get; set; }


    public ShipToAddDto()
    {
        ShipName ??= "";
    }
}