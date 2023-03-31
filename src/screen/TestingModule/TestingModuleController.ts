import {makeAutoObservable} from 'mobx';
import {BLEModule} from '../../model/BLEModule';
import {moduleFactory} from '../../factory/ModuleFactory';
import {BLETestCaseList} from '../../model/BLETestCaseList';
import {BLETestingJSON} from '../../jsons/BLETestingJSON';
import {BLETestCaseDto} from '../../api/DTOs/BLETestCaseDto';
import {BLETestCase} from '../../model/BLETestCase';

export class TestingModuleController {
  private cBmuId: string | null = null;
  private cBLEModule: BLEModule | null = null;
  private cIsBmuFetched: boolean | null = null;
  private cIsBMUIdSubmitted: boolean | null = null;
  private cIsTestingStart: boolean | null = null;
  private cBLETestCaseList: BLETestCaseList | null = null;
  private cCurrentTestCaseIndex: number | null = null;

  constructor() {
    makeAutoObservable(this);
    this.fetchBLETestCaseList();
  }

  async fetchBBLEModule(): Promise<void> {
    //TODO:: Add an api call tp fetch BLE Module
    const response = await moduleFactory.getBLEModule(this.bmuId);
    this.isBMuFetched = true;
    this.isBMUIdSubmitted = true;
    this.bleModule = response.data as BLEModule;
  }

  private fetchBLETestCaseList() {
    const json = BLETestingJSON;
    const dtos: BLETestCaseDto[] = [];
    json.map(jsonOItem => {
      dtos.push({
        ...(jsonOItem as BLETestCaseDto),
        result: '',
      });
    });
    this.bleTestCaseList = new BLETestCaseList(dtos);
  }

  isBLEModule(): boolean {
    return !!this.cBLEModule;
  }

  getBLETestCaseCrntItem(): BLETestCase {
    return this.bleTestCaseList.getItemByIndex(
      this.currentTestCaseIndex,
    ) as BLETestCase;
  }

  getCurrentTestCount(): number {
    return this.currentTestCaseIndex + 1;
  }

  getTotalTestCount(): number {
    return this.bleTestCaseList.size;
  }

  goToNextTestCase(): void {
    if (this.currentTestCaseIndex < this.bleTestCaseList.size) {
      this.currentTestCaseIndex = this.currentTestCaseIndex + 1;
    }
  }

  updateResultInTestCaseList(result: string) {
    const currentBLETestCaseDto = this.getBLETestCaseCrntItem().getDto();
    const newBLETestCaseModel = new BLETestCase({
      ...currentBLETestCaseDto,
      result: result,
    });
    this.bleTestCaseList.updateItemByIndex(
      newBLETestCaseModel,
      this.currentTestCaseIndex,
    );
  }

  get bmuId(): string {
    return this.cBmuId as string;
  }

  get bleModule(): BLEModule {
    return this.cBLEModule as BLEModule;
  }

  get isBMuFetched(): boolean {
    return this.cIsBmuFetched as boolean;
  }

  get isBMUIdSubmitted(): boolean {
    return this.cIsBMUIdSubmitted as boolean;
  }

  get isTestingStart(): boolean {
    return this.cIsTestingStart as boolean;
  }

  get bleTestCaseList(): BLETestCaseList {
    return this.cBLETestCaseList as BLETestCaseList;
  }

  get currentTestCaseIndex(): number {
    return this.cCurrentTestCaseIndex ?? 0;
  }

  set bmuId(value: string) {
    this.cBmuId = value;
  }

  set bleModule(bleModule: BLEModule) {
    this.cBLEModule = bleModule;
  }

  set isBMuFetched(isBMuFetched: boolean) {
    this.cIsBmuFetched = isBMuFetched;
  }

  set isBMUIdSubmitted(isBMUIdSubmitted: boolean) {
    this.cIsBMUIdSubmitted = isBMUIdSubmitted;
  }

  set isTestingStart(isTestingStart: boolean) {
    this.cIsTestingStart = isTestingStart;
  }

  set bleTestCaseList(bleTestCaseList: BLETestCaseList) {
    this.cBLETestCaseList = bleTestCaseList;
  }

  set currentTestCaseIndex(currentTestCaseIndex: number) {
    this.cCurrentTestCaseIndex = currentTestCaseIndex;
  }
}
