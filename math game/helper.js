//if we click on the start/reset button 
var start = document.getElementById("st");
var scoreValue = document.getElementById("scorevalue");
var time = document.getElementById("timer");
var box = document.getElementsByClassName("box");
var playing = false;
var action;
var timing;
var answer;
var score;
var highest = 0;

startreset.addEventListener("click",function(){
    //if we are playing
            //reload the page 
    if(playing === true){
        start.textContent = "Start Game";
        playing = false;
        location.reload();
    }
    else if(playing === false){
        hide("gameOver");
        //if we are not playing 
        //change button text to reset game 
        playing = true;
        start.textContent = "Reset Game";
        //set score to 0
        score = 0;
        scoreValue.innerHTML = score.toString();
            //show countdown box
            show("timeremain");
            timing = 60;
            time.innerHTML = timing;
            startcountdown();
            
            //generate new question and answer
            generateQuestion();

    }
});


//to start countdown
function startcountdown(){
    //reduce time by 1sec in loops
            //timeleft?
                //yes->continue
                 //no->gameover
    action = setInterval(function(){
        if(timing===0){
            playing = false;
            show("gameOver");
            hide("timeremain");
            hide("wrong");
            hide("correct");
            document.getElementById("finalscore").innerHTML = score.toString();
            start.textContent = "Start Game";
            if(score>highest){
                highest = score;
                document.getElementById("highest").innerHTML = highest.toString();
            }
            return;
        }
        timing--;
        time.innerHTML = timing;
    },1000);
}; 

//if we click on answer box
for(var i=0;i<box.length;i++){
    box[i].addEventListener("click",function(){
        //if we are playing
        //correct?
        if(playing){
            if(this.textContent === answer.toString()){
                 //yes
                    //increase score by 1
                score++;
                //show correct box for 1 sec 
                scoreValue.innerHTML = score.toString();
                show("correct");
                setTimeout(function(){
                    hide("correct");
                }, 1000);
                //generate new questions and answers 
                generateQuestion();
            }
            else{
                //no 
                 //show try again box for 1 sec
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                }, 1000);
            }
        }
         //if we are not playing
            //no action
    });
};
         
            
                
                
                   
       
           
//to generate a question and multiple answers 
function generateQuestion(){
    var x = Math.round(9*Math.random()) + 1;
    var y = Math.round(9*Math.random()) + 1;
    var correctAnswer = x*y;
    var correctIndex = Math.round(3*Math.random()) + 1;
    answer = correctAnswer;
    document.getElementById("question").innerHTML = x + " X " + y;
    for(var i=1;i<5;i++){
        if(i===correctIndex){
            continue;
        }
        var t = Math.round(99*Math.random()) + 1;
        document.getElementById("box"+i).innerHTML = t;
    }
    document.getElementById("box"+correctIndex).innerHTML = correctAnswer;
};


//to hide a specific button
function hide(ID){
    document.getElementById(ID).style.display = "none";
};

//to show a specific button
function show(ID){
    document.getElementById(ID).style.display = "block";
};

        