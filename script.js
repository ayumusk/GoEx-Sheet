let body = document.querySelector("body");
body.spellcheck = false;
let oldCell;
let dataObj={};

let formulaInput=document.querySelector(".formula-input-tag");
let celladdress=document.querySelector(".celladdress");
let menuBarPtags = document.querySelectorAll(".options div");
let filOptions= menuBarPtags[0];


 


filOptions.addEventListener("click", function (e) {
  if (e.currentTarget.classList.length == 1) {
   
    e.currentTarget.innerHTML = `File
    <span>
     <span>Clear</span>
     <span>Open</span>
     <span>Save</span>
    </span>`;

    let allFileOptions = e.currentTarget.querySelectorAll("span>span");

    
    allFileOptions[0].addEventListener("click", function () {
      let allCells = document.querySelectorAll(".cell");
      for (let i = 0; i < allCells.length; i++) {
        allCells[i].innerText = "";
        let cellAdd = allCells[i].getAttribute("data-address");
     
        dataObj[cellAdd] = {
          value: "",
          formula: "",
          upstream: [],
          downstream: [],
          fontSize: 10,
          fontFamily: "Arial",
          fontWeight: "normal",
          color: "black",
          backgroundColor: "white",
          underline: "none",
          italics: "normal",
          textAlign: "left",
        };
      }
    });

  
    allFileOptions[1].addEventListener("click", function () {
      
      dataObj = JSON.parse(localStorage.getItem("sheet"));


      for (let j = 1; j <= 100; j++) {
        for (let i = 0; i < 26; i++) {
          let address = String.fromCharCode(i + 65) + j;
          let cellObj = dataObj[address];
          let cellOnUi = document.querySelector(`[data-address=${address}]`);
          cellOnUi.innerText = cellObj.value;
          cellOnUi.style.backgroundColor = cellObj.backgroundColor;
          cellOnUi.style.color=cellObj.color;
          cellOnUi.style.fontSize=cellObj.fontSize;
          cellOnUi.style.fontFamily=cellObj.fontFamily;
          cellOnUi.style.fontWeight=cellObj.fontWeight;
          cellOnUi.style.textAlign=cellObj.textAlign;
          cellOnUi.style.textDecoration=cellObj.underline;
          cellOnUi.style.textStyle=cellObj.italics;
          cellOnUi.formula=cellObj.formula;
          cellOnUi.upstream=cellObj.upstream;
          cellOnUi.downstream=cellObj.downstream;
          
        }
      }
    });

   
    allFileOptions[2].addEventListener("click", function () {
      localStorage.setItem("sheet", JSON.stringify(dataObj));
    });
  } else {
    e.currentTarget.innerHTML = `File`;
  }
});


for(let i=0;i<menuBarPtags.length;i++)
{
  menuBarPtags[i].addEventListener("click",function(e)
  {  
     if(e.currentTarget.classList.contains("menu-selected"))
     {
       e.currentTarget.classList.remove("menu-selected");
     }
     else
     {
       for(let j=0;j<menuBarPtags.length;j++)
       {
        if(menuBarPtags[j].classList.contains("menu-selected"))
        {
          menuBarPtags[j].classList.remove("menu-selected");
        }
       }
       e.currentTarget.classList.add("menu-selected");
     }
  });
}


let columntags=document.querySelector(".column-tags");

  for(let i=0;i<26;i++)
  {
    let div= document.createElement("div");
    div.classList.add("columntags-cell");
    div.innerText=String.fromCharCode(65+i);
    columntags.append(div);
  }


let rowtags=document.querySelector(".row-tags");
for(let i=1;i<=100;i++)
{
  let div=document.createElement("div");
  div.classList.add("rowtags-cell");
  div.innerText=i;
  rowtags.append(div);
}

let grid=document.querySelector(".grid");
for(let j=1;j<=100;j++)
{
   let row=document.createElement("div");
   row.classList.add("row");
   for(let i=0;i<26;i++)
   {
     let cell=document.createElement("div");
     
     cell.classList.add("cell");
     let address = String.fromCharCode(i + 65) + j;
     cell.setAttribute("data-address", address);
     
    dataObj[address] = {
      value: "",
      formula: "",
      upstream: [],
      downstream: [],
      fontSize:10,
      fontFamily:"Arial",
      fontWeight:"normal",
      color:"black",
      backgroundColor:"white",
      underline:"none",
      italics:"normal",
      textAlign:"left"
    };


     cell.addEventListener("click", function (e) {
     
      if (oldCell) {
        
        oldCell.classList.remove("grid-selected");
      }
   
      e.currentTarget.classList.add("grid-selected");

      let cellAddress = e.currentTarget.getAttribute("data-address");

      celladdress.innerText = cellAddress;

     
      oldCell = e.currentTarget;
    });
    
    cell.addEventListener("input", function (e) {
      
      let address = e.currentTarget.getAttribute("data-address");
      dataObj[address].value = Number(e.currentTarget.innerText);

      dataObj[address].formula = "";

   
      let currCellUpstream = dataObj[address].upstream;

      for (let i = 0; i < currCellUpstream.length; i++) {
        removeFromUpstream(address, currCellUpstream[i]);
      }

      dataObj[address].upstream = [];
      

      let currCellDownstream = dataObj[address].downstream;

      for (let i = 0; i < currCellDownstream.length; i++) {
        updateDownstreamElements(currCellDownstream[i]);
      }
    });

    cell.contentEditable = true;
    row.append(cell);
  }
  grid.append(row);
}



formulaInput.addEventListener("change", function (e) {
  let formula = e.currentTarget.value; 

  let selectedCellAddress = oldCell.getAttribute("data-address");

  dataObj[selectedCellAddress].formula = formula;

  let formulaArr = formula.split(" "); 

  let elementsArray = [];

  for (let i = 0; i < formulaArr.length; i++) {
    if (
      formulaArr[i] != "+" &&
      formulaArr[i] != "-" &&
      formulaArr[i] != "*" &&
      formulaArr[i] != "/" &&
      isNaN(Number(formulaArr[i]))
    ) {
      elementsArray.push(formulaArr[i]);
    }
  }

  let oldUpstream = dataObj[selectedCellAddress].upstream;

  for (let k = 0; k < oldUpstream.length; k++) {
    removeFromUpstream(selectedCellAddress, oldUpstream[k]);
  }

  dataObj[selectedCellAddress].upstream = elementsArray;

  for (let j = 0; j < elementsArray.length; j++) {
    addToDownstream(selectedCellAddress, elementsArray[j]);
  }

  let valObj = {};

  for (let i = 0; i < elementsArray.length; i++) {
    let formulaDependency = elementsArray[i];

    valObj[formulaDependency] = dataObj[formulaDependency].value;
  }

  for (let j = 0; j < formulaArr.length; j++) {
    if (valObj[formulaArr[j]] != undefined) {
      formulaArr[j] = valObj[formulaArr[j]];
    }
  }

  formula = formulaArr.join(" ");
  let newValue = eval(formula);

  dataObj[selectedCellAddress].value = newValue;

  let selectedCellDownstream = dataObj[selectedCellAddress].downstream;

  for (let i = 0; i < selectedCellDownstream.length; i++) {
    updateDownstreamElements(selectedCellDownstream[i]);
  }

  oldCell.innerText = newValue
  formulaInput.value = ""
});


function addToDownstream(tobeAdded, inWhichWeAreAdding) {
  
  let reqDownstream = dataObj[inWhichWeAreAdding].downstream;

  reqDownstream.push(tobeAdded);
}

function removeFromUpstream(dependent, onWhichItIsDepending) {
  let newDownstream = [];

  let oldDownstream = dataObj[onWhichItIsDepending].downstream;

  for (let i = 0; i < oldDownstream.length; i++) {
    if (oldDownstream[i] != dependent) newDownstream.push(oldDownstream[i]);
  }
  dataObj[onWhichItIsDepending].downstream = newDownstream;
}

function updateDownstreamElements(elementAddress) {
  
  let valObj = {};

  let currCellUpstream = dataObj[elementAddress].upstream;

  for (let i = 0; i < currCellUpstream.length; i++) {
    let upstreamCellAddress = currCellUpstream[i];
    let upstreaCellValue = dataObj[upstreamCellAddress].value;

    valObj[upstreamCellAddress] = upstreaCellValue;
  }

  
  let currFormula = dataObj[elementAddress].formula;
  
  let formulaArr = currFormula.split(" ");
 
  for (let j = 0; j < formulaArr.length; j++) {
    if (valObj[formulaArr[j]]) {
      formulaArr[j] = valObj[formulaArr[j]];
    }
  }

  
  currFormula = formulaArr.join(" ");

 
  let newValue = eval(currFormula);

  dataObj[elementAddress].value = newValue;


  let cellOnUI = document.querySelector(`[data-address=${elementAddress}]`);
  cellOnUI.innerText = newValue;


  let currCellDownstream = dataObj[elementAddress].downstream;

  
  if (currCellDownstream.length > 0) {
    for (let k = 0; k < currCellDownstream.length; k++) {
      updateDownstreamElements(currCellDownstream[k]);
    }
  }
}
   