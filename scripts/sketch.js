// ml5 POSES DETECTION MODEL
let poseNet;
let noseX = 0;
let noseY = 0;
let eyelX = 0;
let eyelY = 0;

// ml5 FACE DETECTION MODEL
let facemesh;
let predictions = [];

// VIDEOs
let webcam;
let videoGuide;
let canvas;

// IMAGE
let matriz;
let img;
let cartela;

function preload() {
  matriz = loadImage('./imagens/matriz.jpg');
  img = loadImage('imagens/ir.png');
  cartela = loadImage('imagens/cartela.png');
}

function setup() {
    canvas = createCanvas(640, 480);
    canvas.position(25, 200);
    canvas.parent('sketch-video');

    webcam = createCapture(VIDEO);
    webcam.hide();

    videoGuide = createVideo('./videos/VESC_v2.m4v');
    videoGuide.hide();
    videoGuide.volume(0);
    videoGuide.pause();

    poseNet = ml5.poseNet(webcam, PosemodelReady);
    poseNet.on('pose', gotPoses);

    facemesh = ml5.facemesh(webcam, MeshmodelReady);

    facemesh.on("predict", results => {
      predictions = results;
    });

    let box = select('#button-play');
    box.mousePressed(videoPlay);
    function videoPlay() {
    videoGuide.play();
    }

}

function PosemodelReady() {
  console.log('Pose model is ready!');
}

function MeshmodelReady() {
  console.log('Face model is ready!');
}

function gotPoses(poses) {
  if (poses.length > 0) {
    let nX = poses[0].pose.keypoints[0].position.x;
    let nY = poses[0].pose.keypoints[0].position.y;
    let eX = poses[0].pose.keypoints[1].position.x;
    let eY = poses[0].pose.keypoints[1].position.y;
    noseX = lerp(noseX, nX, 0.5);
    noseY = lerp(noseY, nY, 0.5);
    eyelX = lerp(eyelX, eX, 0.5);
    eyelY = lerp(eyelY, eY, 0.5);
  }
}

function draw() {
 if (videoGuide.time() > 68) {
    if (webcam.loadedmetadata) {
       let c = webcam.get(0, 0, 640, 480);
       image(c, 0, 0);
    }
  }
  
  if (videoGuide.time() > 78) {
    drawKeypoints();
  }

  if (videoGuide.time() > 93) {
    clear();
    if (webcam.loadedmetadata) {
      let c = webcam.get(0, 0, 640, 480);
      image(c, 0, 0);
      filter(THRESHOLD);
      canvas.position(1250, 200);
    }
  }

  if (videoGuide.time() > 95) {
    clear();
    canvas.position(620, 200);
    image(matriz, 0, 0);
  }

  if (videoGuide.time() > 103) {
    clear();
  }

  if (videoGuide.time() > 150) { 
    if (webcam.loadedmetadata) {
      canvas.position(620, 200);
      let c = webcam.get(0, 0, 640, 480);
      image(c, 0, 0);

      let d = dist(noseX, noseY, eyelX, eyelY);

      fill(0, 0, 0, 0);
      //ellipse(noseX, noseY, d);
      // rectMode(RADIUS);
      // fill(0,0,0,0);
      // strokeWeight(4);
      // stroke(color(0, 0, 255));
      // rect(eyelX - 50, eyelY, 150, 25);
      
      image(img, eyelX - 190, eyelY - 200, 300, 200);
    }
  }

  if (videoGuide.time() > 158) { 
    if (webcam.loadedmetadata) {
      clear();
      canvas.position(620, 200);
      let c = webcam.get(0, 0, 640, 480);
      image(c, 0, 0);

      let d = dist(noseX, noseY, eyelX, eyelY);

      // p5.fill(0, 0, 0, 0);
      // p5.ellipse(noseX, noseY, d);
      rectMode(RADIUS);
      fill(0,0,0,0);
      strokeWeight(4);
      stroke(color(0, 0, 255));
      rect(eyelX - 50, eyelY, 150, 25);
      
      // p5.image(img, eyelX - 190, eyelY - 200, 300, 200);
    }
  }

  if (videoGuide.time() > 163) {
    clear();
  }

  if (videoGuide.time() > 230) {
    canvas.position(25, 50);
    if (webcam.loadedmetadata) {
      let c = webcam.get(0, 0, 640, 480);
      image(c, 0, 0);
    }
  }

  if (videoGuide.time() > 235) {
    clear();
  }

  if (videoGuide.time() > 509) { 
    if (webcam.loadedmetadata) {
      canvas.position(200, 100);
      let c = webcam.get(0, 0, 640, 480);
      image(c, 0, 0);

      let d = dist(noseX, noseY, eyelX, eyelY);

      fill(0, 0, 0, 0);
      image(img, eyelX - 190, eyelY - 200, 300, 200);
      image(cartela, 0, 0);

    }
  }
  if (videoGuide.time() > 529) {
    videoGuide.stop();
  }
}

function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].scaledMesh;

    for (let j = 0; j < keypoints.length; j += 1) {
      const [x, y] = keypoints[j];

      fill(0, 255, 0);
      ellipse(x, y, 5, 5);
    }
  }
}

function keyTyped() {
  if (key === 'a') {
    saveCanvas(canvas, 'voce_esta_sendo_codificado', 'jpg');
  } else if (key === 's') {
    saveCanvas(canvas, 'voce_esta_sendo_codificado', 'jpg');
  }
}