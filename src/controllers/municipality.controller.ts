import MunicipalityService from '@services/municipality/municipality.service';
import { Request } from 'express';

class MunicipalityController {
  public municipalityService = new MunicipalityService();
  public getArea = async (req: Request) => {
    const municipalityId = Number(req.params.municipalityId);
    return await this.municipalityService.findAreaDetails(municipalityId);
  };
}
export default MunicipalityController;
