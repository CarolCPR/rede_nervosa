let video;
let features;
let knn;
let labelP;
let ready = false;
let label = 'nothing';
let button;
var i=0;

function setup() {
  createCanvas(320, 240);
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
  features = ml5.featureExtractor('MobileNet', modelReady);
  //knn = ml5.KNNClassifier();
  labelP = createP('começando treinamento...');
  labelP.style('font-size', '32pt');
  button = createButton('uso a mão...');
  button.position(20,20);
  button.mousePressed(changeButton);
}

function changeButton(){
  console.log(i);
  if(i==0){
    i = 1;
  }else i=0;
}

function goClassify(){
  const logits = features.infer(video);
    knn.classify(logits, function (error, result){
        if(error){
            console.error(error);
        }else {
            label = result.label;
            switch(result.label){
              case '3':
              case '2':
                labelP.html('s');
              case '1':
                labelP.html('a');
              case '0':
                labelP.html('b');
              default:
                labelP.html(label);
            }
            if(result.label == '3') 
              labelP.html('...');
            else if(result.label == '2') 
              labelP.html('s');
            else if(result.label == '1') 
              labelP.html('a');
            else if(result.label == '0')
              labelP.html('b');
            else labelP.html(label);
            goClassify();
        }
      });
}

function keyPressed(){
  const logits = features.infer(video);
  if(key == '+') knn.save("model.json");
  else if(key.length==1)
    knn.addExample(logits, key);
    console.log(key);
}

function modelReady(){
  console.log("MobileNet loaded!");
  knn = ml5.KNNClassifier();
  knn.load("model_4.json", function(){
    console.log('KNN Data Loaded');
    goClassify();
    });
}

function draw() {
  /*if(!ready && knn.getNumLabels() > 0){
    goClassify();
    ready = true;
  }*/
  image(video, 0, 0);

  if(i==0){
    noStroke();
    fill(255, 124, 23, 100);
    rect(0, 100, 120, 240);
  }else{
    noStroke();
    fill(255, 124, 23, 100);
    rect(200, 100, 120, 240);
  }
  
}

// Temporary save code until ml5 version 0.2.2
