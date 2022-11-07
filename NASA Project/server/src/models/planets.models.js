const fs = require('fs');
const path = require('path');

const { parse } = require('csv-parse');

const planets = require('./planets.mongo');

// const habitablePlanets = [];

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED' && 
        planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 &&
        planet['koi_prad'] < 1.6;
}

/* Promise Recap 
const promise =  new Promise((resolve, reject) => {
    resolve(42);
});
promise.then((result) => {

});
const result = await promise
console.log(result);
Solution to resolve problem of returning habitable planets before completely reading data
Await Promise will ensure data is read completely first
*/

function loadPlanets() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on('data', async (data) => {
                if (isHabitablePlanet(data)) {
                    // habitablePlanets.push(data);
                    // T̶O̶D̶O̶:̶ R̶e̶p̶l̶a̶c̶e̶ b̶e̶l̶o̶w̶ c̶r̶e̶a̶t̶e̶ w̶i̶t̶h̶ M̶o̶n̶g̶o̶ i̶n̶s̶e̶r̶t̶ +̶ u̶p̶d̶a̶t̶e̶ =̶>̶ u̶p̶s̶e̶r̶t̶
                    // await planets.create({
                    //     keplerName: data.kepler_name,
                    // });
                    savePlanet(data);
                }
            })
            .on('error', (err) => {
                console.log(err);
                reject(err);
            })
            .on('end', async () => {
                // console.log(habitablePlanets.map((planet) => {
                //     return planet['kepler_name'];
                // }));
                const countPlanetsFound = (await getAllPlanets()).length;
                // console.log(`${habitablePlanets.length} Habitable Planets Found!`);
                console.log(`${countPlanetsFound} Habitable Planets Found!`);
                // console.log('Done');
                resolve();
            });
    });
}
    
async function getAllPlanets() {
    // return habitablePlanets
    return await planets.find({}, {
        _id: 0, __v: 0,
    });
}

async function savePlanet(planet) {
    try {
        await planets.updateOne({
            keplerName: planet.kepler_name
        }, {
            keplerName: planet.kepler_name
        }, {
            upsert: true
        });
    } catch(err) {
        console.err(`Could not save planet ${err}`);
    }
}

module.exports = {
    loadPlanets,
    getAllPlanets,
};