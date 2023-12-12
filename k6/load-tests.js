import http from "k6/http";
import { Trend, Rate, Counter, Gauge } from "k6/metrics";
import { assertIsStatus200 } from './helpers/request-utils.js';

export const TrendRTT = new Trend("RTT");
export const GaugeContentSize = new Gauge("ContentSize");
export const CounterErrors = new Counter("Errors");
export const options = {
  vus: 2, // virtual users
  duration: "5s", // test duration
  thresholds: {
    http_req_failed: ["rate<0.01"], // http errors should be less than 1%
    http_req_duration: ["p(95)<300"], // 95% of requests should be below 300ms
    Errors: ["count<100"], // Count: Incorrect content cannot be returned more than 99 times.
    ContentSize: ["value<4000"], // Gauge: returned content must be smaller than 4000 bytes
    RTT: ["p(99)<300", "p(70)<250", "avg<200", "med<150", "min<100"] // Trend: Percentiles, averages, medians, and minimums (in millisecs)
  }
};

export default function() {
  const baseUri = 'https://swapi.dev/api/';
  
  let peopleResponse = http.get(`${baseUri}people/1`);
  assertIsStatus200(peopleResponse);

  let planetsResponse = http.get(`${baseUri}planets/1`);
  assertIsStatus200(planetsResponse);
}
