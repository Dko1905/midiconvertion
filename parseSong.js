const fs = require('fs');

const filename = "tetris.song";
const outputFilename = "tetris.arr";

fs.readFile(filename, 'utf8', function (err,data) {
	if(err){
		console.log(err);
		return;
	}
	
	const lines = data.split('\n');

	let output = [];

	for(let line of lines){
		
		if(line[0] === 'T'){
			let values = line.split(', ');

			let tone = values[1];
			let targetDuration = values[2];
			let actualDuration = values[3];

			output.push([Math.round(Number(tone)), Math.round(Number(targetDuration))]);
		}
		else if(line[0] === 'D'){
			let values = line.split(', ');

			let tone = 0; // No tone in a delay
			let duration = values[1];

			output.push([Number(tone), Math.round(Number(duration))]);
		}
	}

	fs.writeFileSync(outputFilename, JSON.stringify(output), 'utf8');
});

// Freq, Time
// Arr: [[Int, Int], [Int, Int], [Int, Int]]
function clean(arr){
	arr.push([0, 0]);
	let results = [];

	let lastFreq;
	let timeSum;
	for(let note of arr){
		if(lastFreq == note[0]){
			timeSum += note[1];
		}
		else{
			if(timeSum && lastFreq){
				results.push([lastFreq, timeSum]);
			}
			lastFreq = note[0];
			timeSum = note[1];
		}
	}
	
	return results;
}