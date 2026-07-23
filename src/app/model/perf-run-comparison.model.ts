export interface PerfRunComparison {
  idA: string;
  idB: string;

  deltaP95: number;
  deltaHttpReqFailed: number;
  deltaGlobalScore: number;
}
