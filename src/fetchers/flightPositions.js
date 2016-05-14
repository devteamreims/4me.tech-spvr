

export default function fetchFlightPositionsStatus() {
  return Promise.resolve({
    status: 'normal',
    description: 'WebService providing 4ME with flight positions',
    when: Date.now(),
  })
}
