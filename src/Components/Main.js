import React from 'react'
import {questionData} from './Questions'

class Main extends React.Component {
    state = {
        currentQuestion : 0,
        myAnswer: null,
        options: [],
        score: 0,
        disabled: true,
        end: false
    }

    loadQuestion = ()=>{
        this.setState(()=>{
            return {
                questions: questionData[this.state.currentQuestion].question,
                answer: questionData[this.state.currentQuestion].answer,
                options: questionData[this.state.currentQuestion].options
            }
        })
    }

    componentDidMount() {
        this.loadQuestion()
    }
    nextQuestion = () =>{
        const {myAnswer, answer, score} = this.state
        if (myAnswer === answer) {
            this.setState({
                score:score+1
            })
        }
        this.setState({
            currentQuestion: this.state.currentQuestion + 1
        })
    }
    componentDidUpdate(prevProps, prevState){
        if (this.state.currentQuestion !== prevState.currentQuestion){
            this.setState(()=>{
                return {
                    disabled: true,
                    questions: questionData[this.state.currentQuestion].question,
                    options: questionData[this.state.currentQuestion].options,
                    answer: questionData[this.state.currentQuestion].answer
                }
            })
        }
    }
    // check answer
    checkAnswer = answer =>{
        this.setState({ myAnswer: answer, disabled: false})
    }
    finish = ()=>{
        if (this.state.currentQuestion === questionData.length-1){
            this.setState({
                end: true
            })
        }
        if (this.state.myAnswer === this.state.answer){
            this.setState({
                score: this.state.score +1
            })
        }
    }
    //render
    render() {
        const { options, myAnswer, currentQuestion, end }= this.state
        if (end){
            return(
                <div className= "result">
                    <h3>Game over, your final score is {this.state.score} correct answers of {questionData.length+1}</h3>
                </div>
            )
        }
        else{
            return(
                <div className='App'>
                    <h1>{this.state.questions}</h1>
                    <span>{`Questions ${currentQuestion} out of ${questionData.length-1} remaining`}</span>
                    {options.map(option =>(
                        <p
                        key={option.id}
                        className= {`ui floating message options ${myAnswer === option ? "selected" : null}`}
                        onClick= {()=> this.checkAnswer(option)}
                        >
                            {option}
                        </p>
                    ))}
                    {currentQuestion< questionData.length-1 && (
                        <button
                            className= "ui inverted button"
                            disabled= {this.state.disabled}
                            onClick= {this.nextQuestion}
                        >
                            Next
                        </button>
                    )}
                    {currentQuestion === questionData.length-1 && (
                        <button
                            className= "ui inverted button"
                            onClick= {this.finish}
                        >
                            finish
                        </button>
                    )}
                </div>
            )
        }
    }
}
export default Main
