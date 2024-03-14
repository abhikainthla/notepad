import { useState, useRef, useEffect } from "react";
import React from "react";
import { MdDeleteForever } from "react-icons/md";
import {
  FaHeading,
  FaBold,
  FaStrikethrough,
  FaLink,
  FaQuoteRight,
  FaCode,
  FaRegImage,
  FaItalic,
} from "react-icons/fa";
import "./Textarea.css";
import "./Aside.css";
import { AiOutlineFileAdd } from "react-icons/ai";

function Textarea() {
  const [value, setValue] = useState("# Enter title here");
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  window.onload = () => {
    const writeBtn = document.getElementById("write-btn");
    const previewBtn = document.getElementById("preview-btn");
    writeBtn.style.border = "1px solid black"
    previewBtn.style.border = "none";
  }
  function handleText(event) {
    setValue(event.target.value);
  }

  function setCaretPosition(start, end) {
    
    textareaRef.current.setSelectionRange(start, end);
    textareaRef.current.focus();
  }

  function handleHeading() {
    const startPos = textareaRef.current.selectionStart;
    const endPos = textareaRef.current.selectionEnd;
    const newValue = "# " + value.substring(startPos, endPos);
    setValue(
      (value) => value.slice(0, startPos) + newValue + value.slice(endPos)
    );
    setCaretPosition(startPos + newValue.length, startPos + newValue.length); 
  }

  function handleBold() {
    const startPos = textareaRef.current.selectionStart;
    const endPos = textareaRef.current.selectionEnd;
    const newValue = "**" + value.substring(startPos, endPos) + "**";
    setValue(
      (value) => value.slice(0, startPos) + newValue + value.slice(endPos)
    );
    setCaretPosition(endPos + 2, endPos + newValue.length - 2); 
  }

  function handleItalic() {
    const startPos = textareaRef.current.selectionStart;
    const endPos = textareaRef.current.selectionEnd;
    const newValue = "*" + value.substring(startPos, endPos) + "*";
    setValue(
      (value) => value.slice(0, startPos) + newValue + value.slice(endPos)
    );
    setCaretPosition(endPos + 1, endPos + newValue.length - 1); 
  }

  function handleStrikethrough() {
    const startPos = textareaRef.current.selectionStart;
    const endPos = textareaRef.current.selectionEnd;
    const newValue = "~~" + value.substring(startPos, endPos) + "~~";
    setValue(
      (value) => value.slice(0, startPos) + newValue + value.slice(endPos)
    );
    setCaretPosition(endPos + 2, endPos + newValue.length - 2); 
  }

  function handleLink() {
    const startPos = textareaRef.current.selectionStart;
    const endPos = textareaRef.current.selectionEnd;
    const newValue = "[" + value.substring(startPos, endPos) + "](url)";
    setValue(
      (value) => value.slice(0, startPos) + newValue + value.slice(endPos)
    );
    setCaretPosition(endPos + 2, endPos + newValue.length - 2); 
  }

  function handleQuotes() {
    const startPos = textareaRef.current.selectionStart;
    const endPos = textareaRef.current.selectionEnd;
    const newValue = "> " + value.substring(startPos, endPos);
    setValue(
      (value) => value.slice(0, startPos) + newValue + value.slice(endPos)
    );
    setCaretPosition(startPos + newValue.length, startPos + newValue.length); 
  }

  function handleCode() {
    const startPos = textareaRef.current.selectionStart;
    const endPos = textareaRef.current.selectionEnd;
    const newValue = "`" + value.substring(startPos, endPos) + "`";
    setValue(
      (value) => value.slice(0, startPos) + newValue + value.slice(endPos)
    );
    setCaretPosition(endPos + 1, endPos + newValue.length - 1);
  }

  function handleImage() {
    const startPos = textareaRef.current.selectionStart;
    const endPos = textareaRef.current.selectionEnd;
    const newValue = "![](https://example.com/your-image.png)";
    setValue(
      (value) => value.slice(0, startPos) + newValue + value.slice(endPos)
    );
    setCaretPosition(endPos + 1, endPos + newValue.length - 1);
  }
  function handlePreview() {
    const parsedText = parseText(value);
    setText(parsedText);
    const textarea = document.getElementById("note");
    const textview = document.getElementById("view");
    const writeBtn = document.getElementById("write-btn");
    const previewBtn = document.getElementById("preview-btn");
    writeBtn.style.border = "none";
    previewBtn.style.border = "1px solid black"

    textarea.style.display = "none";
    textview.style.display = "block";
  }

  function parseText(text) {

    let parsedText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong><br/>"); 
    parsedText = parsedText.replace(/\*(.*?)\*/g, "<em>$1</em><br/>"); 
    parsedText = parsedText.replace(/~~(.*?)~~/g, "<del>$1</del><br/>"); 
    parsedText = parsedText.replace(/# (.*?)\n/g, "<h1>$1</h1><br/>"); 
    parsedText = parsedText.replace(/> (.*?)\n/g, "<q>$1</q><br/>");
    parsedText = parsedText.replace(/\`(.*?)\`/g, "<button>$1</button><br/>");
    return parsedText;
  }

  const [addedNote, setAddednote] = React.useState([]);
  function addCard() {
    setAddednote(prevNotes => [...prevNotes, value]);
  }

  useEffect(() => {
    setText(parseText(value));
  }, [value]);

  function handleWrite() {
    const textarea = document.getElementById("note");
    const textview = document.getElementById("view");
    const writeBtn = document.getElementById("write-btn");
    const previewBtn = document.getElementById("preview-btn");
    writeBtn.style.border = "1px solid black"
    previewBtn.style.border = "none";
    textarea.style.display = "block";
    textview.style.display = "none";

  }
  
    const handleDelete=(index) =>{
    const updateText = [...addedNote];
    updateText.splice(index,1);
    setAddednote(updateText);
  }

  const changeText=(index) =>{
    const newText = [...addedNote];
    setValue(newText[index]);
  }

  return (
    <div className="container">
      <div className="aside-container">
        <div>
          <h1>
            NOTES{" "}
            <button className="add-btn" onClick={addCard}>
              <AiOutlineFileAdd style={{ width: "20px", height: "auto" }} />
            </button>
          </h1>
          <hr />
        </div>
        <div style={{width:"250px"}}>
            <ul style={{listStyle:"none", width:"250px"}} >
            {
                addedNote.map((item, index) => (
                    <li key={index} className="list" onClick={() =>changeText(index)}>{item}<button onClick={() =>handleDelete(index)} className="delete-button"><MdDeleteForever style={{width:"20px", height:"20px"}} /></button></li>
                ))
            }
            </ul>
        </div>
        </div>

        <div>
          <div className="btns">
            <div>
              <button id="write-btn" className="btn" onClick={handleWrite}>
                Write
              </button>
              <button id="preview-btn" className="btn" onClick={handlePreview}>
                Preview
              </button>
            </div>
            <div>
              <button className="btn2" onClick={handleHeading}>
                <FaHeading />
              </button>
              <button className="btn2" onClick={handleBold}>
                <FaBold />
              </button>
              <button className="btn2" onClick={handleItalic}>
                <FaItalic />
              </button>
              <button className="btn2" onClick={handleStrikethrough}>
                <FaStrikethrough />
              </button>
            </div>
            <div>
              <button className="btn2" onClick={handleLink}>
                <FaLink />
              </button>
              <button className="btn2" onClick={handleQuotes}>
                <FaQuoteRight />
              </button>
              <button className="btn2" onClick={handleCode}>
                <FaCode />
              </button>
              <button className="btn2" onClick={handleImage}>
                <FaRegImage />
              </button>
            </div>
          </div>
          <div className="text-container">
            <p style={{fontSize:"14px", marginBottom:"5px"}}>// Press enter in textarea to apply changes</p>
            <textarea
              ref={textareaRef}
              name="note"
              id="note"
              style={{ height: "80vh", width: "100%" }}
              value={value}
              onChange={handleText}
            ></textarea>
            <br />
          </div>
          <div className="preview-container">
            <div
              id="view"
              style={{ display: "none" }}
              dangerouslySetInnerHTML={{ __html: text }}
            ></div>
          </div>
        </div>
    </div>
  );
}

export default Textarea;
