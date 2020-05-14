let video;
let features;
let knn;
let labelP;
let ready = false;
let label = 'nothing';

function setup() {
  createCanvas(320, 240);
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
  features = ml5.featureExtractor('MobileNet', modelReady);
  //knn = ml5.KNNClassifier();
  labelP = createP('need training data');
  labelP.style('font-size', '32pt');
}

function goClassify(){
  const logits = features.infer(video);
    knn.classify(logits, function (error, result){
        if(error){
            console.error(error);
        }else {
            //labelP.html(result.label);
            //console.log(result);
            label = result.label;
            labelP.html(result.label);
            goClassify();
        }
    });
}

function keyPressed(){
  const logits = features.infer(video);
  if(key == '+') knn.save("model.json");
  else if(key.length==1)
    knn.addExample(logits, key);
}

function modelReady(){
  console.log("MobileNet loaded!");
  knn = ml5.KNNClassifier();
  knn.load("model.json", function(){
    console.log('KNN Data Loaded');
    goClassify();
    });
}

function draw() {
  image(video, 0, 0);
  /*if(!ready && knn.getNumLabels() > 0){
    goClassify();
    ready = true;
  }*/
  noStroke()
  fill(0, 0, 200, 100);
  rect(0, 100, 120, 240);
}

