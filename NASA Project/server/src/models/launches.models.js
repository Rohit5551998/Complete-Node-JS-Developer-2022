const axios = require('axios');
const { find } = require('./launches.mongo');

const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

// const launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 100;
// let latestFlightNumber = 100;

const launch = { //Comment indicates SPACEX API fields
    flightNumber: 100, //flight_number
    mission: 'Kepler Mission X', //name
    rocket: 'Explorer IS1', //rocket.name
    launchDate: new Date('December 27, 2030'), //date_local
    target: 'Kepler-442 b', //Not Applicable
    customers: ['ZTM', 'NASA'], //payload.customers for each payload
    upcoming: true, //upcoming
    success: true, //success
};

// launches.set(launch.flightNumber, launch);
saveLaunch(launch);

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

async function populateLaunches() {
    console.log('Downloading launch data...')
    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        customers: 1
                    }
                }
            ]
        }
    });

    if (response.status !== 200) {
        console.log("Problem downloading launch data");
        throw new Error('Launch data download failed');
    }

    const launchDocs = response.data.docs;

    for (const launchDoc of launchDocs) {
        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((payload) => {
            return payload['customers'];
        })

        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers: customers,
        };

        console.log(`${launch.flightNumber} ${launch.mission}`);

        // T̶O̶D̶O̶:̶ P̶o̶p̶u̶l̶a̶t̶e̶ l̶a̶u̶n̶c̶h̶e̶s̶ c̶o̶l̶l̶e̶c̶t̶i̶o̶n̶
        await saveLaunch(launch);

    }
}

async function loadLaunchData() {
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat'
    });

    if (firstLaunch) {
        console.log('Launch Data already loaded');
    } else {
        await populateLaunches();
    }

}

async function findLaunch(filter) {
    return await launchesDatabase.findOne(filter);
}

async function existsLaunchWithId(launchId) {
    // return launches.has(launchId);
    return await findLaunch({flightNumber: launchId});
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase
        .findOne()
        .sort('-flightNumber');

    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }
    console.log(latestLaunch);
    return latestLaunch.flightNumber;
}


async function getAllLaunches(skip, limit) {
    // return Array.from(launches.values());
    return await launchesDatabase
        .find({}, { _id: 0, __v: 0, })
        .skip(skip)
        .limit(limit);
}

async function saveLaunch(launch) {
    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    });
}

async function scheduleNewLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target
    });

    if (!planet) {
        throw new Error('No matching planet found');
    }

    const newFlightNumber = await getLatestFlightNumber() + 1;

    const newLaunch = Object.assign(launch, {
        upcoming: true,
        customers: ['Zero to Mastery', 'NASA'],
        success: true, 
        flightNumber: newFlightNumber,
    });

    await saveLaunch(newLaunch);
}

// function addNewLaunch(launch) {
//     latestFlightNumber += 1;
//     launches.set(
//         latestFlightNumber, 
//         Object.assign(launch, {
//             upcoming: true,
//             customer: ['Zero to Mastery', 'NASA'],
//             success: true,
//             flightNumber: latestFlightNumber, 
//         })
//     );
// }

async function abortLaunchById(launchId) {
    // const aborted = launches.get(launchId);
    // aborted.upcoming = false;
    // aborted.success = false;
    // return aborted;
    const aborted = await launchesDatabase.updateOne({
        flightNumber: launchId,
    }, {
        upcoming: false,
        success: false,
    });
    return aborted.modifiedCount === 1;
}

module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    // addNewLaunch,
    scheduleNewLaunch,
    abortLaunchById,
    loadLaunchData,
}