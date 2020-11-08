objects=[];

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
    if(status!=""){
        objectDetector.detect(video,gotResults);
        for(i=0;i<objects.length;i++){
            document.getElementById("number_of_objects").innerHTML="Number Of Objects Detected Are: "+objects.length;
    
            document.getElementById("status").innerHTML="Objects Detected";
            fill("#09ff00");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+10,objects[i].y+10);
            noFill();
            stroke("#09ff00");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

            if(objects[i].label==input){
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("status").innerHTML=input+" Is Found";
                //speech code goes here 
                var synth = window.speechSynthesis;
                speak_data = objects[i].label;
                utterThis=new SpeechSynthesisUtterance("object mentioned found");
                synth.speak(utterThis)
            }
            else{
                video.stop();
                document.getElementById("status").innerHTML=input+"Is Not Found";
            }
        }
    }
}

function gotResults(error,results){
    if(error){
        console.error("error");
    }
    else{
        console.log(results);
        objects=results;
    }
}