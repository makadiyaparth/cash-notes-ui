export function getDate(): string {
  return new Date().toISOString().split('T')[0];
}
