namespace NaviGateAPI.Dtos;

public partial class VoyageToEditDto
{
    public int VoyageId { get; set; }
    public string VoyageDeparturePortName { get; set; }
    public string VoyageDeparturePortCountry { get; set; }
    public string VoyageArrivalPortName { get; set; }
    public string VoyageArrivalPortCountry { get; set; }
    public DateTime VoyageStart { get; set; }
    public DateTime VoyageEnd { get; set; }

    public VoyageToEditDto()
    {
        VoyageDeparturePortName ??= "";
        VoyageDeparturePortCountry ??= "";
        VoyageArrivalPortName ??= "";
        VoyageArrivalPortCountry ??= "";
    }
}