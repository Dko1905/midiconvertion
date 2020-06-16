const { Midi } = require('@tonejs/midi');
const fs = require('fs');

const inputFilename = 'little_USSR.mid';
const outputFilename = 'little_USSR.asong';
const track = 0; // Starts at 0

if(!fs.existsSync(inputFilename)){
	console.log(`${inputFilename} does not exist`);
	return 1;
}
else{
	Midi.fromUrl(inputFilename).then(a => {
		a.tracks.forEach( track => {
			const notes = track.notes;
	
			notes.forEach(console.log);
		});
	});
	
}

function parse(){

}