namespace NaviGateAPI.Dtos;

public partial class VoyageToAddDto
{
    public int ShipId { get; set; }
    public DateTime VoyageDate { get; set; }
    public string VoyageDeparturePortName { get; set; }
    public string VoyageDeparturePortCountry { get; set; }
    public string VoyageArrivalPortName { get; set; }
    public string VoyageArrivalPortCountry { get; set; }
    public DateTime VoyageStart { get; set; }
    public DateTime VoyageEnd { get; set; }

    public VoyageToAddDto()
    {
        VoyageDeparturePortName ??= "";
        VoyageDeparturePortCountry ??= "";
        VoyageArrivalPortName ??= "";
        VoyageArrivalPortCountry ??= "";
    }
}