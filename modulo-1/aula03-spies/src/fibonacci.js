class Fibonacci {
  *execute(input, current = 0, next = 1) {
    // generator

    if (input === 0) {
      return 0;
    }

    // yield: return by demand
    // retorna o valor
    yield current;

    // delega a função, mas não retorna valor
    yield* this.execute(input - 1, next, current + next);
  }
}

module.exports = Fibonacci;
