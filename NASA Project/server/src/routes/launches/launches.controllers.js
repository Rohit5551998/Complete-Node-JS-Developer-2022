const { existsLaunchWithId, getAllLaunches, scheduleNewLaunch, abortLaunchById } = require('../../models/launches.models');
const { getPagination } = require('../../services/query');


async function httpGetAllLaunches(req, res) {
    // console.log(req.query);
    const { skip, limit } = getPagination(req.query);
    const launches = await getAllLaunches(skip, limit);
    return res.status(200).json(launches);
}

async function httpAddNewLaunch(req, res) {
    launch = req.body;

    if ( !launch.mission || !launch.rocket || !launch.launchDate || !launch.target ) {
        return res.status(400).json({
            error: 'Missing data, require launch property',
        });

    }

    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid Launch Date'
        });
    }

    await scheduleNewLaunch(launch);
    return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);

    const existsLaunch = await existsLaunchWithId(launchId);
    if (!existsLaunch) {
        return res.status(404).json({
            error: "Launch not Found",
        });
    }

    const aborted = await abortLaunchById(launchId);
    if (!aborted) {
        return res.status(400).json({
            error: "Launch not aborted",
        })
    }

    return res.status(200).json(aborted);

}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
};