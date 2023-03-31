import {List} from './List';
import {BLETestCase} from './BLETestCase';
import {BLETestCaseDto} from '../api/DTOs/BLETestCaseDto';

export class BLETestCaseList extends List<BLETestCase> {
  constructor(dtos: BLETestCaseDto[]) {
    super(dtos, BLETestCase, false);
  }
}
