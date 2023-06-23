import DB from '@/databases';
import { HttpException } from '@/exceptions/HttpException';
import { Municipality } from '@/interfaces/municipality.interface';
import MunicipalityMessages from '@/messages/municipality.messages';

export default class MunicipalityService {
  public municipality = DB.Municipalities;

  public async findAreaDetails(municipalityId: number): Promise<Municipality> {
    const areaDetails: Municipality = await this.municipality.findByPk(municipalityId);
    if (!areaDetails) throw new HttpException(MunicipalityMessages.MUNICIPALITY_NOT_FOUND, 404);
    return areaDetails;
  }
}
