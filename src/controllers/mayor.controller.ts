import { Request } from 'express';
import MayorService from '@/services/mayor/mayor.service';
import TranslationService from '@/services/translation/translation.service';
import { getLanguageHeader } from '@/utils/get-lang-header';
import { MayorTranslationKeys } from '@/utils/constants/translation-keys';
import { isUpdateAll } from '@/utils/is-update-all';
import { getUpdateWithoutTranslation } from '@/utils/get-update-without-translation';

export default class MayorController {
  public mayorService = new MayorService();
  public translationService = new TranslationService();

  public getMayorDetails = async (req: Request) => {
    const language = getLanguageHeader(req);
    const municipalityId = Number(req.params.municipalityId);
    const mayorDetails = await this.mayorService.findMayor(municipalityId, language);
    return mayorDetails;
  };

  public getMayorDetailsMobile = async (req: Request) => {
    const language = getLanguageHeader(req);
    const municipalityId = Number(req.params.municipalityId);
    const mayorDetails = await this.mayorService.findMayorMobile(municipalityId, language);
    return mayorDetails;
  };

  public updateMayor = async (req: Request) => {
    const language = getLanguageHeader(req);
    const updateAll = isUpdateAll(req);
    const id = Number(req.params.mayorId);
    let updateBody = req.body;
    if (updateAll) {
      updateBody = await this.translationService.translate(req.body, MayorTranslationKeys, language);
    } else {
      updateBody = getUpdateWithoutTranslation(req, MayorTranslationKeys);
    }
    await this.mayorService.updateMayor(updateBody, id);
  };
}
