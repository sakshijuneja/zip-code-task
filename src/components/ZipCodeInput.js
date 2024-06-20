import "../styles/zipCodesInput.css";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";

const ZipCodesInput = () => {
  // const [inputVal, setInputVal] = useState("");
  const [showVal, setShowVal] = useState([]);
  const [tags, setTags] = useState([]);
  const [isPasted, setIsPasted] = useState(false);
  const [pasteVal, setPasteVal] = useState([]);
  // console.log("showVal", showVal);
  console.log("tags", tags);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // setShowVal(inputVal);
  //   // setShowVal = [...inputVal]
  //   // setShowVal([...showVal, tags]);
  // };

  const handleDelete = (index) => {
    // alert("delete")
    const updatedTags = tags.filter((el, i) => i !== index);
    setTags(updatedTags);
    setShowVal(updatedTags);
  };
  console.log("inside pasteVal", pasteVal);

  const handleKeyDown = (e) => {
    if (isPasted) {
      setTags([...tags, ...pasteVal]);
      setShowVal([...tags, ...pasteVal]);
      setIsPasted(false);
      e.target.value = " ";

      return;
    }

    if (e.key === "Backspace") {
      if (e.target.value == "") {
        alert("i m delteing");
        handleDelete(tags.length - 1);
      }
    }
    if (e.key !== "Enter") {
      return;
    }
    let input = e.target.value;
    console.log("input", input);

    let result = input.replace(/[^0-9]+/g, "");

    if (result == "") {
      e.target.value = " ";
      return;
    }

    // console.log("tags", tags)

    setTags([...tags, result]);

    setShowVal([...showVal, result]);

    tags.map((tag) => {
      if (tag == result) {
        // alert("Same" )
        console.log(tag);
        console.log(result);
        const updatedDelted = tags.filter((el) => el !== result);
        console.log("updted tg", updatedDelted);
        setTags(updatedDelted);
        setShowVal(updatedDelted);
      }
    });

    e.target.value = " ";
    setIsPasted(false);
    // console.log("result", result);
  };

  const handlePaste = (e) => {
    setIsPasted(true);
    const paste = e.clipboardData.getData("text");
    let commaSplit = paste.split(",");
    console.log("commaSplit", commaSplit);
    let getNumbers = commaSplit.map((item) =>
      item.trim().replace(/[^0-9]+/g, "")
    );

    let pasteRes = getNumbers.filter((item, index) => {
      return item !== "" && getNumbers.indexOf(item) === index;
    });

    const uniquePasteRes = pasteRes.filter((item) => !tags.includes(item));

    setPasteVal(uniquePasteRes);
    console.log("getNumbers", getNumbers);
    console.log("pasteRes", pasteRes);
    console.log("uniquePasteRes", uniquePasteRes);
    console.log("set pasteVal", pasteVal);
  };

  return (
    <>
      <div>
        <div className="zipCodesText">
          {tags.map((el, index) => {
            return (
              <div className="zipCodesTag" key={index}>
                <span className="text">{el}</span>
                <span className="close">
                  <CloseIcon onClick={() => handleDelete(index)} />
                </span>
              </div>
            );
          })}
          <div>
            <input
              placeholder="Enter Zip Code"
              type="text"
              className="input-field"
              // onChange={(e) => {
              //   setTags(e.target.value);
              // }}
              onPaste={handlePaste}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
      {showVal.map((el, index) => {
        return (
          <div className="showValList" key={index}>
            <span className="text">{el}</span>
            <span className="close">
              <DoneIcon />
            </span>
          </div>
        );
      })}
      {/* WRONG APPROACH */}
      {/* <div>
        <Form onSubmit={handleSubmit}>
          <InputGroup className="zipCodesInputContainer">
            <InputGroup.Text>Zip Code</InputGroup.Text>

            <Form.Control
              as="textarea"
              aria-label="With textarea"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
              }}
            />
            <Button variant="outline-dark" type="submit">
              Enter
            </Button>
          </InputGroup>
        </Form>
      </div> */}

      {/* {showVal.map((el) => {
        return <li className="showValList">{el}</li>;
      })} */}
    </>
  );
};
export default ZipCodesInput;
