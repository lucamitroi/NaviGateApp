namespace NaviGateAPI.Models;

public partial class Ports
{
    public int PortId { get; set; }
    public int ShipId { get; set; }
    public string PortName { get; set; }
    public string PortCountry { get; set; } 

    public Ports()
    {
        PortName ??= "";
        PortCountry ??= "";
    }
}