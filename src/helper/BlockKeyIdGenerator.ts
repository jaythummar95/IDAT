class BlockKeyIdGenerator {
  generateKey4Byte(): string {
    return Math.random().toString().slice(3, 11);
  }
}

export const blockKeyIdGenerator = new BlockKeyIdGenerator();
