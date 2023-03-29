function* generateIncrementalValues() {
  for (let i = 0x0000; i <= 0xfff; i++) {
    yield i;
  }
}

// Example usage
for (let value of generateIncrementalValues()) {
  console.log(value);
}
