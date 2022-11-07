const API_URL = 'http://localhost:8000/v1';

// T̶O̶D̶O̶:̶ O̶n̶c̶e̶ A̶P̶I̶ i̶s̶ r̶e̶a̶d̶y̶.̶
// Load planets and return as JSON.
async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`);
  return await response.json();
}

// T̶O̶D̶O̶:̶ O̶n̶c̶e̶ A̶P̶I̶ i̶s̶ r̶e̶a̶d̶y̶.̶
// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  const fetchedLaunches = await response.json();
  return fetchedLaunches.sort((a,b) => {
    return a.flightNumber - b.flightNumber;
  }); 
}

// T̶O̶D̶O̶:̶ O̶n̶c̶e̶ A̶P̶I̶ i̶s̶ r̶e̶a̶d̶y̶.̶
// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch(err) {
    console.log(err);
    return {
      ok: false,
    };
  }
}

// T̶O̶D̶O̶:̶ O̶n̶c̶e̶ A̶P̶I̶ i̶s̶ r̶e̶a̶d̶y̶.̶
// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: "DELETE"
    })
  } catch(err) {
    console.log(err);
    return {
      ok: false,
    }
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};