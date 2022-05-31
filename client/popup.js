const grabBtn = document.getElementById("grabBtn");
const colorCode= document.getElementById("colorCode");
const colorValue= document.getElementById("colorValue");
const colors = document.getElementById("colors");


let colorsArray=[];

grabBtn.addEventListener("click", async()=>{
    let [tab]=await chrome.tabs.query({
        active:true,
        currentWindow:true
    }); 
    console.log(tab.url);
    let tabUrl= tab.url;
    if(tabUrl.includes("chorme")){
    
        chrome.scripting.executeScript({
            target:{
                tabId:tab.id,
                function:jaiho,
            }
        })
    }
    else{
        chrome.scripting.executeScript({
            target: {tabId : tab.id},
            function:pickColor,
        },async(result)=>{
            if(result){

                const [data] = result;
                try{
                  if(data.result){
                      console.log(data.result.sRGBHex);
                      let color=data.result.sRGBHex;
                      colorCode.innerText=color;
                      colorValue.style.background=color;
                      colorsArray.push(color);
                      console.log(colorsArray);
                      colors.innerHTML +=`<span class="colorBlock" style="background:${color}"}></span>`;

                      try {
                          await navigator.clipboard.writeText(color);
                      }
                      catch(err){
                          console.error(err);
                      }
                  }  
                }
                catch(err){
                  console.error(err);
              }
            }
            else{
                console.log("no result");
            }
        });
    }


    
});


async function pickColor(){
    try{
    
        const eyeDropper = new EyeDropper();
        let result= await eyeDropper.open();
        return result;
    }
    catch(err){
        console.error(err);
    }
}


function jaiho(){
    grabBtn.innerText="you cnt access this page ";
}
