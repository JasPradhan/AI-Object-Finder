status="";

function preload(){

}

function setup(){
    canvas=createCanvas(325,325);
    canvas.position(600,377);
    video=createCapture(VIDEO);
    video.hide();
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    input=document.getElementById("input").value;
}

function modelLoaded(){
    console.log("Model Loaded");
    status=true;
}

function draw(){
    image(video,0,0,325,325);
}