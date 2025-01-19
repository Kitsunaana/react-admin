import { StrategyException } from '../exceptions/strategy.exception';

export class StrategyContext<T> {
  protected strategy: T | undefined;

  public setStrategy(strategy: T) {
    this.strategy = strategy;
  }

  protected checkExistStrategy(strategy: T | undefined): strategy is T {
    if (strategy === undefined) throw new StrategyException('Strategy is not defined');

    return true;
  }
}
