import React,{useState,useEffect} from 'react'

function Quiz2() {
    const[quizbutton,setQuizButton]=useState(false);
    const [result,setResult]=useState("");
const [score,setScore]=useState(0);
const[num1,setNum1]=useState(0);
const[num2,setNum2]=useState(0);
const [operator,setOperator]=useState("");
const[ops]=useState(['+','-','*','/']);
const [disabled,setDisabled]=useState(true);
const[index,setIndex]=useState(0);
const[showAnswer,setShowAnswer]=useState(false);

useEffect(()=>{

  setNum1(Math.floor(Math.random() * 10));
    setNum2(Math.floor(Math.random()*10));
    
    setOperator(ops[Math.floor(Math.random()*ops.length)]);
},[]);

var res;
function calculateResult(num1,num2,operator){
    switch(operator){
        case "+":res=num1+num2;break;
        case "-":res=num1-num2;break;
        case "/":res=num1/num2;break;
        case "*":res=num1*num2;break;
        default:res=0
    }
    return res;
}

function nextButton(){
    setNum1(Math.floor(Math.random() *10));
    setNum2(Math.floor(Math.random()*10));
    
    setOperator(ops[Math.floor(Math.random()*ops.length)]);
    calculateResult(num1,num2,operator);
const calResult=calculateResult(num1,num2,operator);
if(Math.round(calResult)===Math.round(result)){
    setScore(score+1);
}
setShowAnswer(true);
setResult("");
setIndex(index+1);

}
function changeInput(e){
    setResult(e.target.value);
    setDisabled(false);
}

function endQuiz(){
    setScore(0);
    setQuizButton(false);
}
useEffect(()=>{
if(index===20){
    endQuiz();
}
},[index]);

console.log(score)

    return (
        <div className="quiz2">
            <h1 className="heading-quiz2">Quiz2</h1>
            {quizbutton?(<>
            <h2 className="question2">
                {num1} {operator} {num2}
                </h2>
                <input type="number" value={result} onChange={changeInput}/>
                <span>Please enter whole numbers</span>
                <button type="button" className="btn btn-success" onClick={nextButton} disabled={disabled}>Submit</button>
                <button type="button" className="btn btn-warning" onClick={endQuiz}>End Quiz</button>
                {showAnswer?<> 
                <h1>Score:{score}</h1></>:""}

            </>):(<button className="btn btn-primary" onClick={()=>setQuizButton(true)}>Start Quiz</button>)}
        </div>
    )
}

export default Quiz2
