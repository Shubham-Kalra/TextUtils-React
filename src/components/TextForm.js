import React, {useState} from 'react';

export default function TextForm(props) {

  const handleUpCsClick = ()=>{
    // console.log("Converted to Upper Case: " + text);
    let upperText = text.toUpperCase();
    setText(upperText);
    props.showAlert("Converted to UPPER CASE.", "success");
  }

  const handleLoCsClick = ()=>{
    // console.log("Converted to Lower Case: " + text);
    let lowerText = text.toLowerCase();
    setText(lowerText);
    props.showAlert("Converted to lower case.", "success");
  }

  const handleClearClick = ()=>{
    setText('');
    props.showAlert("Text Cleared.", "success");
  }

  const handleCopy = ()=>{
    let cpytext = document.getElementById("myBox");
    cpytext.select();
    navigator.clipboard.writeText(cpytext.value);
    props.showAlert("Copied to Clipboard.", "success");
  }

  const handleExtraSpaces = ()=>{
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Extra Spaces Removed.", "success");
  }

  const handleTitleCase = ()=>{
    let newText = text.toLowerCase();
    newText = newText.split(/[ ]+/);
    newText = newText.map((word)=>word.charAt(0).toUpperCase()+word.slice(1));
    // console.log(newText);
    setText(newText.join(" "));
    props.showAlert("Converted to Title Case.", "success");
  }

  const handleOnChange = (event)=>{
    // console.log("On Change");
    setText(event.target.value);
  }

  const wordCount = ()=>{
    let newText = text.split(/[ ]+/);
    newText = newText.join(" ");

    if(text[text.length-1] === undefined){
      return 0;
    }else if(text[text.length-1]===" "){
      return newText.split(" ").length-1;
    }else if(text[0]===" "){
        return newText.split(" ").length-1;
    }else{
      return newText.split(" ").length;
    }
  }

  const [text, setText] = useState('')
  let readTime = 0.008*wordCount();             //125 words per minute

  // text = "Hello, Enter text here!";              //Wrong way to change the state
  // setText("Hello, Enter text here!");             //Correct way to change the state
  return (
    <>
        <div className="container my-3" style={{color: props.mode==='light'?'black':'white'}}>
          <h1>{props.heading}</h1>
            <div className="mb-3">
                {/* <label for="myBox" className="form-label">{props.heading}</label> */}
                <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor: props.mode==='dark'?'black':'white', color: props.mode==='light'?'black':'white'}} id="myBox" rows="10"></textarea>
            </div>
            <button className={`btn btn-${props.mode==='light'?'success':'primary'} mx-1`} onClick={handleUpCsClick}>Convert to UPPER CASE</button>
            <button className={`btn btn-${props.mode==='light'?'success':'primary'} mx-1`} onClick={handleLoCsClick}>Convert to lower case</button>
            <button className={`btn btn-${props.mode==='light'?'success':'primary'} mx-1`} onClick={handleClearClick}>Clear Text</button>
            <button className={`btn btn-${props.mode==='light'?'success':'primary'} mx-1`} onClick={handleCopy}>Copy Text</button>
            <button className={`btn btn-${props.mode==='light'?'success':'primary'} mx-1`} onClick={handleExtraSpaces}>Remove Extra Spaces</button>
            <button className={`btn btn-${props.mode==='light'?'success':'primary'} mx-1`} onClick={handleTitleCase}>Convert to Title Case</button>
        </div>
        <div className="container my-3" style={{color: props.mode==='light'?'black':'white'}}>
          <h2>Your Text Summary</h2>
          <p><b>{wordCount()} Words {text.length} Characters</b></p>
          <p><b>{Math.floor(readTime)} Minutes {Math.round((readTime-Math.floor(readTime))*60)} Seconds Read</b></p>
          <h2>Preview</h2>
          <p>{text.length>0?text:'Write something in the textbox above to preview it here.'}</p>
        </div>
        </>
  )
}
