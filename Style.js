let textcolor= document.querySelector(".textcolor span");
let colorbackground= document.querySelector(".color span");
let leftalign= document.querySelector(".left span");
let centeralign= document.querySelector(".center span");
let rightalign= document.querySelector(".right span");
let fontsize=document.querySelector(".fontsize");
let font=document.querySelector(".font");
let fontSizes=document.querySelector(".fontsize")
let boldstyle=document.querySelector(".bold span");
let italicsstyle=document.querySelector(".italics span");
let underlinestyle=document.querySelector(".underlined span");
let gridContainer=document.querySelector(".grid");
let columnTags=document.querySelector(".column-tags");
let rowNumbers=document.querySelector(".row-tags")
font.addEventListener("change",function(e)
{   let address=oldCell.getAttribute("data-address");

    oldCell.style.fontFamily = e.currentTarget.value;

    dataObj[address].fontFamily=e.currentTarget.value;

    

});

fontSizes.addEventListener("change",function(e)
{   let address=oldCell.getAttribute("data-address");

    oldCell.style.fontSize = e.currentTarget.value+'px';

    dataObj[address].fontSize=e.currentTarget.value+'px';
  

});

boldstyle.addEventListener("click",function()
{
    let isActive = boldstyle.classList.contains("active-btn");
    let address = oldCell.getAttribute("data-address");

    if (isActive == false) {
      
        oldCell.style.fontWeight = "bold";
        boldstyle.classList.add("active-btn");
        dataObj[address].fontWeight="bold"
    } else {
       
        oldCell.style.fontWeight = "normal";
        boldstyle.classList.remove("active-btn");
       
        dataObj[address].fontWeight="normal"
        
    }
})
italicsstyle.addEventListener("click",function()
{
    let isActive =italicsstyle.classList.contains("active-btn");
    let address = oldCell.getAttribute("data-address");

    if (isActive == false) {
       
        oldCell.style.fontStyle = "italic";
        italicsstyle.classList.add("active-btn");
        dataObj[address].italics="italic"
    } else {
        
        oldCell.style.fontStyle = "normal";
        italicsstyle.classList.remove("active-btn");
       
        dataObj[address].italics="normal"
        
    }
})


underlinestyle.addEventListener("click", function () {
    
    let isActive = underlinestyle.classList.contains("active-btn");
    let address =  oldCell.getAttribute("data-address");
    
  
    if (isActive == false) {
        
        oldCell.style.textDecoration = "underline";
        underlinestyle.classList.add("active-btn");
        dataObj[address].underline="underline"
    } else {
      
        oldCell.style.textDecoration = "none";
        underlinestyle.classList.remove("active-btn");
        dataObj[address].underline="normal"
    }
})

textcolor.addEventListener("click",function()
{
    let colorpicker= document.createElement("input");
    colorpicker.type="color";
    colorpicker.addEventListener("change", function(e)
    {
        oldCell.style.color=e.currentTarget.value;
        let address=oldCell.getAttribute("data-address");
        dataObj[address].fontcolor=e.currentTarget.value;
    });
    colorpicker.click();
    setTimeout(()=>{
  
       colorpicker.type="text";
        
      }, 5000); 
    

});

gridContainer.addEventListener("scroll", function () {
     
    let top = gridContainer.scrollTop;
    let left = gridContainer.scrollLeft;

    columnTags.style.top = top + "px";
    rowNumbers.style.left = left + "px";

})



colorbackground.addEventListener("click", function () {
    let colorPicker = document.createElement("input");
    colorPicker.type = "color";
  
    colorPicker.addEventListener("change", function (e) {
      oldCell.style.backgroundColor = e.currentTarget.value;
      let address = oldCell.getAttribute("data-address");
      dataObj[address].backgroundColor = e.currentTarget.value;
  
     
    });
  
    colorPicker.click();

    setTimeout(()=>{
  
       colorPicker.type="text";
        
      }, 5000); 
  });

  leftalign.addEventListener("click", function(){
      oldCell.style.textAlign="left";
      let address=oldCell.getAttribute("data-address");
      dataObj[address].textAlign="left";
  });

  centeralign.addEventListener("click", function(){
    oldCell.style.textAlign="center";
    let address=oldCell.getAttribute("data-address");
    dataObj[address].textAlign="center";
});
   rightalign.addEventListener("click", function(){
    oldCell.style.textAlign="right";
    let address=oldCell.getAttribute("data-address");
    dataObj[address].textAlign="right";
});


