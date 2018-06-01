// game settings
const gridsize = 19;
const notation = '?';
const rules = 'area';
let localplayerstones = 'black';



// ui settings (in css pixels)
let marginsize = 100;
let squaresize = 30;
const linewidth = 1;
const starsize = 4;



// select board
const boardcontainer = document.querySelector('section#boardcontainer');
const board = boardcontainer.querySelector('canvas#board');
const ctx = board.getContext('2d');



// set dimensions based on css layout values
// adjust canvas size to number of real device pixels
// concept from: https://jsfiddle.net/cmaas/pq4L0ana/
const canvassize = (marginsize * 2) + ((gridsize - 1) * squaresize) + gridsize;

const pixeldensity = window.devicePixelRatio || 1;
const adjustedcanvassize = canvassize * pixeldensity;

board.width = adjustedcanvassize;
board.height = adjustedcanvassize;

board.style.width = canvassize + 'px';
board.style.height = canvassize + 'px';

marginsize = marginsize * pixeldensity;
squaresize = squaresize * pixeldensity;



// set grid styles, with offset for crisp lines
ctx.translate(0.5, 0.5);
ctx.strokeStyle = '#666';
ctx.fillStyle = '#666';
ctx.lineWidth = linewidth;



// draw the board

// horizontal lines
for (let i = 0; i < gridsize; i++) {
	ctx.beginPath();
	ctx.moveTo(marginsize, marginsize + (i * squaresize) + i);
	ctx.lineTo(adjustedcanvassize - marginsize - gridsize, marginsize + (i * squaresize) + i);
	ctx.stroke();
}

// vertical lines
for (let i = 0; i < gridsize; i++) {
	ctx.beginPath();
	ctx.moveTo(marginsize + (i * squaresize) + i, marginsize);
	ctx.lineTo(marginsize + (i * squaresize) + i, adjustedcanvassize - marginsize - gridsize);
	ctx.stroke();
}

// stars
switch (gridsize) {
	case 13:
		// 4, 10
		break;

	case 19:
		let stars = [
			[4, 4],
			[4, 10],
			[4, 16],
			[10, 4],
			[10, 10],
			[10, 16],
			[16, 4],
			[16, 10],
			[16, 16]
		];
		stars.forEach(star => {
			let posx = marginsize + ((star[0] - 1) * squaresize) + star[0] - linewidth;
			let posy = marginsize + ((star[1] - 1) * squaresize) + star[1] - linewidth;
			ctx.beginPath();
			ctx.arc(posx, posy, starsize, 0, 2*Math.PI);
			ctx.fill();
		});
		break;

	default:
		break;
}



// draw notation
// from black's seat, A1 is the top left corner (0, 0)
if (localplayerstones === 'black') {

} else {

}



// build coordinates
// TODO: length of x and y should be set based on gridsize value
let coordinates = [];

let xaxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's'];
let yaxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

xaxis.forEach((xel, i) => {
	
	yaxis.forEach((yel, j) => {
		let entry = {
			x: xaxis[i],
			y: yaxis[j],
			posx: marginsize + (i * squaresize) + (i * linewidth),
			posy: marginsize + (j * squaresize) + (i * linewidth)
		};
		coordinates.push(entry);
	});
});



// stone placement helper
// TODO: debounce
const findnearestpoint = (e) => {
	console.log(e);
};

board.addEventListener('mousemove', findnearestpoint);