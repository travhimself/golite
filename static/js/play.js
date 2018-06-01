// app settings
const ns = 'http://www.w3.org/2000/svg';



// game settings
const gridsize = 19;
const notation = '?';
const rules = 'area';
let localplayerstones = 'black';

const stars = {
	13: [
		[4, 4],
		[4, 10],
		[10, 4],
		[10, 10]
	],
	19: [
		[4, 4],
		[4, 10],
		[4, 16],
		[10, 4],
		[10, 10],
		[10, 16],
		[16, 4],
		[16, 10],
		[16, 16]
	]
};

const gridmarks = {
	13: {
		xaxis: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'],
		yaxis: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
	},
	19: {
		xaxis: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S'],
		yaxis: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
	}
};



// ui settings (in css pixels)
const marginsize = 50;
const squaresize = 25;
const linewidth = 1;
const starsize = 3;
const notationoffset = 30;
const pointsize = 12;
const fontfamily = 'Nunito Sans';



// derived settings
const boardsize = (gridsize - 1) * squaresize + (marginsize * 2);
const playareasize = boardsize - (marginsize * 2);



// select board and adjust size/orientation based on settings (so we get nice crisp lines)
const boardcontainer = document.querySelector('section#boardcontainer');
const board = boardcontainer.querySelector('svg#board');

board.style.width = boardsize;
board.style.height = boardsize;

boardcontainer.className = `playerstones${localplayerstones}`;



// draw board lines
for (let i = 0; i < gridsize; i++) {
	let line = document.createElementNS(ns, 'line');
	line.setAttribute('x1', marginsize);
	line.setAttribute('y1', marginsize + (squaresize * i));
	line.setAttribute('x2', playareasize + marginsize);
	line.setAttribute('y2', marginsize + (squaresize * i));
	line.setAttribute('stroke-width', linewidth);
	line.setAttribute('class', 'line');
	board.appendChild(line);

	line = document.createElementNS(ns, 'line');
	line.setAttribute('x1', marginsize + (squaresize * i));
	line.setAttribute('y1', marginsize);
	line.setAttribute('x2', marginsize + (squaresize * i));
	line.setAttribute('y2', playareasize + marginsize);
	line.setAttribute('stroke-width', linewidth);
	line.setAttribute('class', 'line');
	board.appendChild(line);
}

// draw board stars
stars[gridsize].forEach(star => {
	let posx = marginsize + ((star[0] - 1) * squaresize);
	let posy = marginsize + ((star[1] - 1) * squaresize);
	let circle = document.createElementNS(ns, 'circle');
	circle.setAttribute('cx', posx);
	circle.setAttribute('cy', posy);
	circle.setAttribute('r', starsize);
	circle.setAttribute('class', 'star');
	board.appendChild(circle);
});



// draw board notation
// from black's seat, A1 is the top left corner (0, 0)
gridmarks[gridsize].xaxis.forEach((char, i) => {
	let text = document.createTextNode(char);
	let mark = document.createElementNS(ns, 'text');
	mark.setAttribute('x', marginsize + (squaresize * i));
	mark.setAttribute('y', notationoffset);
	mark.setAttribute('text-anchor', 'middle');
	mark.setAttribute('alignment-baseline', 'middle');
	mark.setAttribute('font-family', fontfamily);
	mark.setAttribute('font-size', '10px');
	mark.setAttribute('class', 'notation');
	mark.appendChild(text);
	board.appendChild(mark);
});

gridmarks[gridsize].yaxis.forEach((char, i) => {
	let text = document.createTextNode(char);
	let mark = document.createElementNS(ns, 'text');
	mark.setAttribute('x', notationoffset);
	mark.setAttribute('y', marginsize + (squaresize * i));
	mark.setAttribute('text-anchor', 'middle');
	mark.setAttribute('alignment-baseline', 'middle');
	mark.setAttribute('font-family', fontfamily);
	mark.setAttribute('font-size', '10px');
	mark.setAttribute('class', 'notation');
	mark.appendChild(text);
	board.appendChild(mark);
});



// draw points
gridmarks[gridsize].xaxis.forEach((charx, i) => {
	
	gridmarks[gridsize].yaxis.forEach((chary, j) => {

		let entry = {
			x: gridmarks[gridsize].xaxis[i],
			y: gridmarks[gridsize].yaxis[j],
			posx: marginsize + (i * squaresize),
			posy: marginsize + (j * squaresize)
		};

		// coordinates.push(entry);
		// coordinates[`${charx}${chary}`] = 0;

		let circle = document.createElementNS(ns, 'circle');
		circle.setAttribute('cx', entry.posx);
		circle.setAttribute('cy', entry.posy);
		circle.setAttribute('r', pointsize);
		circle.setAttribute('data-x', entry.x);
		circle.setAttribute('data-y', entry.y);
		circle.setAttribute('class', 'point');
		board.appendChild(circle);
	});
});



// initial connection
socket.on('connect', function(data) {
	socket.emit('join', 'Hello World from client');
});



// update game state upon emission from the server
socket.on('updategamestate', function (state) {
	console.log('updating game state');
	console.log(state);
	drawboard(state);
});

const drawboard = (state) => {
	console.log('drawing board');
	Object.entries(state).forEach(entry => {
		let x = entry[0].substring(0,1);
		let y = entry[0].substring(1);
		let o = entry[1];

		let position = board.querySelector(`circle[data-x="${x}"][data-y="${y}"]`);
		position.setAttribute('data-owner', o);
	});
};