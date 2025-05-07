namespace NaviGateAPI.Dtos;

public partial class PortsDto
{
    public int PortId { get; set; }
    public string PortName { get; set; }
    public string PortCountry { get; set; } 

    public PortsDto()
    {
        PortName ??= "";
        PortCountry ??= "";
    }
}