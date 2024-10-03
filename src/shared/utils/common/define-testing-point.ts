type defineTestingPointParams = { volume: string; point: string };

export default function defineTestingPoint({
  volume,
  point,
}: defineTestingPointParams) {
  return `volume:[${volume}] ${point}`;
}
