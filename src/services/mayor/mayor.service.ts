import DB from '@/databases';
import { MayorTranslationKeys } from '@/utils/constants/translation-keys';
import { getTableExclusion } from '@/utils/get-table-exclusion';
import { getTableInclusion } from '@/utils/get-table-inclusion';
import { workTimeStringArray } from '@/utils/work-time-string-array.util';

export default class MayorService {
  public mayor = DB.Mayor;

  public async findMayor(municipalityId: number, language: string): Promise<Object> {
    const exclude = getTableExclusion(MayorTranslationKeys);
    const include: any = getTableInclusion(language, MayorTranslationKeys);
    const mayor = await this.mayor.findOne({
      where: { municipalityId },
      attributes: {
        include,
        exclude,
      },
    });
    return mayor;
  }

  public async findMayorMobile(municipalityId: number, language: string): Promise<Object> {
    const exclude = getTableExclusion(MayorTranslationKeys);
    const include: any = getTableInclusion(language, MayorTranslationKeys);
    const mayor = await this.mayor.findOne({
      where: { municipalityId: municipalityId },
      attributes: {
        include,
        exclude,
      },
      raw: true,
    });
    const workTimeStrList = workTimeStringArray(mayor.timing, language);
    return { ...mayor, workTimeStrList };
  }

  public async updateMayor(updateBody: any, municipalityId: Number) {
    await this.mayor.update(updateBody, { where: { id: municipalityId } });
  }
}
