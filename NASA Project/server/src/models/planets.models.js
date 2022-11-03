const fs = require('fs');
const path = require('path');

const { parse } = require('csv-parse');


const habitablePlanets = [];

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
            .on('data', (data) => {
                if (isHabitablePlanet(data)) {
                    habitablePlanets.push(data);
                }
            })
            .on('error', (err) => {
                console.log(err);
                reject(err);
            })
            .on('end', () => {
                // console.log(habitablePlanets.map((planet) => {
                //     return planet['kepler_name'];
                // }));
                console.log(`${habitablePlanets.length} Habitable Planets Found!`);
                // console.log('Done');
                resolve();
            });
    });
}
    
module.exports = {
    loadPlanets,
    planets: habitablePlanets,
}