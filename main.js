img="";
object=[];
status="";

function preload()
{
    img = loadImage("image.jpg");
    
}

function setup()
{
    canvas = createCanvas(400,300);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "status: Detecting images";

}

function modelLoaded()
{
    console.log("modelLoaded");
    status = true;
    objectDetector.detect(img,gotResult);
}

function gotResult(error,result)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(result);
        object = result;
    }
}

function draw()
{
    image(img,0,0,400,300);

    if(status !="")
    {
        for(i=0;i<object.length;i++)
        {
            document.getElementById("status").innerHTML = "status: Detected images";
            
            fill("red");
            percent= Math.floor(object[i].confidence*100);
            noFill();
            stroke("red");
            text(object[i].label+""+percent+"%",object[i].x,object[i].y);
            rect(object[i].x,object[i].y , object[i].width,object[i].height);
        }

    }
}

