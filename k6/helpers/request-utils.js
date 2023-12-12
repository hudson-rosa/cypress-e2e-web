import { sleep, check } from "k6";

export const assertIsStatus200 = function(response) {
  check(response, {
    "is status 200": r => r.status === 200
  });
  console.log(`Status Code: ${response.status}`);
  sleep(1);
};
