const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Mission X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch(launch) {
    latestFlightNumber += 1;
    launches.set(
        latestFlightNumber, 
        Object.assign(launch, {
            upcoming: true,
            customer: ['Zero to Mastery', 'NASA'],
            success: true,
            flightNumber: latestFlightNumber, 
        })
    );
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
}