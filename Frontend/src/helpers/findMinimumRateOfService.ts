interface Service {
  name: string;
  description: string;
  rate: number;
  _id: string;
}

export function findMinimumRateOfService(services: Service[]): number | null {
  if (services.length === 0) {
    return null; // Return null if the array is empty
  }

  return services.reduce((minRate, service) => {
    return service.rate < minRate ? service.rate : minRate;
  }, services[0].rate);
}
