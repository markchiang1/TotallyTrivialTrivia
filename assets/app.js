
//array to hold each question object
var questionArr = [
    {   question:"How many squares are there on a monopoly board ?",
        choices:['a: 40','b: 50','c: 60','d: 70'],
        ans:'a'
    },
    {   question:"What is the largest country by area that only has one time zone ?",
        choices:['a: Mexico','b: United States','c: Rusia','d: China'],
        ans:'d'
    },
    {   question:"Which city does not have an official Disneyland ?",
        choices:['a: Tokyo','b: Shanghai','c: Los Angeles','d: Moscow'],
        ans:'d'
    },
    {   question:"In what place was Christmas once illegal ?",
        choices:['a: England','b: France','c: Brazil','d: Rusia'],
        ans:'a'
    },
    {   question:"Coulrophobia means fear of what ?",
        choices:['a: Jews','b: Sacred Things','c: Clowns','d: Old People'],
        ans:'c'
    },
    {   question:"Which of the following is the longest running American animated TV show ?",
        choices:['a: TV Funhouse','b: Rugrats','c: Simpsons','d: Pokemon'],
        ans:'c'
    },
    {   question:"How many pounds of pressure do you need to rip off your ear ?",
        choices:['a: 7','b: 2','c: 17','d:11'],
        ans:'a'
    },
    {   question:"At what temperature are Fahrenheit and Celsius the same ?",
        choices:['a: 0','b: -40','c: 50','d: 92'],
        ans:'b'
    },
    {   question:"In what key do most American car-horns honk ?",
        choices:['a: F','b: G','c: E','d: C'],
        ans:'a'
    },
    {   question:"What is the fear of houses ?",
        choices:['a: Rhabdophobia','b: Neophobia','c: Oikophobia','d: Jedeophobia'],
        ans:'c'
    },
    {   question:"The NY phone book had 22 Hitlers before WWII. How many did it have at the end of the twentieth century ?",
        choices:['a: 13','b: 4','c: 0','d: 11'],
        ans:'c'
    },
    {   question:"What percentage of Japenese citizens are cremated ?",
        choices:['a: 98','b: 11','c: 5','d: 26'], 
        ans:'a'
    },]
var quizArr; //to randomly choose questions from questionsArr
var gameClock=15;
var totalQuestions=10;
var questionNum=0;
var correctGuesses;
var timer;
var startBTN;
var isEndGame =false;
var guess='';
var isTimeUp =false;

function beginGame(){
    $("#gamePrompt").html("<button id='startBTN'><h3 class='display-4'>Start</h3></button>")
    questionNum=0;
}

function endGame(){
    isEndGame=true
    $('#questionPrompt').html("<h1 id='endGameMessage'>End of Trivia !!!</h1>")
    $('#questionPrompt').append("<h3 id='statistic'>You got "+correctGuesses+" guesses correct out of "+ totalQuestions+" !</h3>")
    $('#questionPrompt').append("<h3 id='restartGameMessage'>Click [START] Button to play again.</h3>")
    
    setTimeout(function(){
        $("#gamePrompt").html("<button id='startBTN'><h3 class='display-4'>Start</h3></button>")
    }, 2000)
    
}

function timesUp(){
    clearInterval(timer)
    $('#questionPrompt').html("<h3>Out of time!</h3>")
    $('#choices').html("<h3>The correct answer is "+questionArr[questionNum].ans+"</h3>")
    setTimeout(function(){
        gameClock=15
        questionNum++
        $('#questionPrompt').html('')
        $('#choices').html('')
        isTimeUp=false
        printQuestion()
    }, 2000)
}

function checkAnswer(guess){
    var answer=guess
    var correctAns = questionArr[questionNum].ans
    console.log(correctAns)
    console.log(answer)
    if(answer===(questionArr[questionNum].ans)){
        $('#questionPrompt').html("<h3>You are correct !!!</h3>")
        setTimeout(function(){
            questionNum++
            correctGuesses++
            gameClock=15
            $('#questionPrompt').html('')
            printQuestion()
        }, 2000)
        
    }
    else{
        $('#questionPrompt').html("<h3>You are wrong!</h3>")
        $('#choices').html("<h3>The correct answer is "+questionArr[questionNum].ans+"</h3>")
        setTimeout(function(){
            gameClock=15
            questionNum++
            $('#questionPrompt').html('')
            $('#choices').html('')
            printQuestion()
        }, 2000)
    }
}

function printQuestion(){
    //create the timer for each question
    if(questionNum===totalQuestions){
        isEndGame=true
        $('#questionPrompt').html("<h1 id='endGameMessage'>End of Trivia !!!</h1>")
        $('#questionPrompt').append("<h3 id='statistic'>You got "+correctGuesses+" guesses correct out of "+ totalQuestions+" !</h3>")
        $('#questionPrompt').append("<h3 id='restartGameMessage'>Click [START] Button to play again.</h3>")
        setTimeout(function(){
            $("#gamePrompt").html("<button id='startBTN'><h3 class='display-4'>Start</h3></button>")
            $(document).on("click", "#startBTN", function(){
                isEndGame=false
                $('#questionPrompt').html('')
                $('#choices').html('')
                beginGame()
            })    
        }, 1000)
    }

    if(isEndGame===false){
        timer=setInterval(function(){
            gameClock--
            if(gameClock>=0){
                $("#clock").html(gameClock)
            }
            else{
                timesUp()
                // isTimeUp=true;
            } 
        },1000)
            
        // if(isTimeUp===false){
            //store and print question to user
            var stringQ=questionArr[questionNum].question
            $('#questionPrompt').text(questionArr[questionNum].question)
            console.log(questionNum)
        
            //print choices for user
            for (i=0; i<questionArr[questionNum].choices.length; i++){
                $('#choices').append("<button class='multipleChoices' value='"+i+"'>"+questionArr[questionNum].choices[i]+" </button><br>")
            }
        
            $('.multipleChoices').click(function(){
                
                var num=$(this).attr("value")
                console.log(num)
                if(num==='0'){
                    guess='a';
                }
                else if(num==='1'){
                    guess='b';
                }
                else if (num==='2'){
                    guess='c';
                }
                else if (num==='3'){
                    guess='d';
                }
                console.log(guess)
                $('#choices').html('')
                $('#submitBTN').html('')
                clearInterval(timer)
                checkAnswer(guess) 
            })
        // }
    } // end of if end game check statment
} // end of printQuestion()

$(document).ready(function(){
    beginGame()
    $('#startBTN').on("click", function(){
        $('#questionPrompt').html('')
        $('#choices').html('')
        endGame=false;
        //hide start button after it is clicked
        startBTN = document.getElementById('startBTN')
        startBTN.style.display = "none"
        //print game clock
        $("#gamePrompt").html("<h1 class='gameClock'> Time Remaining: <span id='clock'>" + gameClock + " </span></h1><br>")
        //1st printQustion call to print the 1st question
        printQuestion()
    })   
})