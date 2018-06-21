function setup() {
	let video = document.getElementById("video");
	let canvas = document.getElementById("canvas");
	let pre = document.getElementById("predictions")
	let model = null;
}

async function startCamera() {
	let stream = await navigator.mediaDevices.getUserMedia({video:true});
	video.srcObject = stream;
	await video.play();
	setinterval(()=>takeSnapshor(), 1000);
}

function takeSnapshot() {
	let context = canvas.getContext("2d"),
	width = video.videoWidth,
	height = video.videoHeight;
	//Setup a canvas with the same dimensions as the video 
	if (width && height) {
		canvas.width = width;
		canvas.height = height;
		//Make a copy of the current frame in the video on the canvas
		context.drawImage(video,0,0,width,height);
		//Call classifyImage to get predictions
		classifyImage();
	}
}

async function classifyImage() {
	predictions = await model.classify(canvas);
	displayPredictions(predictions);
}

function displayPredictions(predictions) {
	let val = "";
	for (prediction of predictions) {
		//For each prediction we will get the probability and times by 100 and fix to 2 decimal places
		let perc = (prediction.probability*100).toFixed(2);
		var += `${perc}% | ${prediction.className}\n`;
		console.log(val);
	}
	pre.innerHTML = val;
}

async function main() {
	model = await mobilenet.load();
	await startCamera();
}
main();