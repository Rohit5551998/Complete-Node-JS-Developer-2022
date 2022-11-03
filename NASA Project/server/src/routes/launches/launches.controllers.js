const { existsLaunchWithId, getAllLaunches, addNewLaunch, abortLaunchById } = require('../../models/launches.models');

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
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

    addNewLaunch(launch);
    return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);

    if (!existsLaunchWithId(launchId)) {
        return res.status(404).json({
            error: "Launch not Found",
        });
    }

    const aborted = abortLaunchById(launchId);
    return res.status(200).json(aborted);

}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
};