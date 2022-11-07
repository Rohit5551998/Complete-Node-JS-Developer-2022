const launchesDatabase = require('./launches.mongo');

const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Mission X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true
};

// launches.set(launch.flightNumber, launch);
saveLaunch(launch);

function existsLaunchWithId(launchId) {
    return launches.has(launchId);
}

async function getAllLaunches() {
    // return Array.from(launches.values());
    return await launchesDatabase
        .find({}, { _id: 0, __v: 0, });
}

async function saveLaunch(launch) {
    await launchesDatabase.updateOne({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    });
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

function abortLaunchById(launchId) {
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById,
}