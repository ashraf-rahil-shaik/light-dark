
const hexInput = document.getElementById('hexInput');
const inputColor = document.getElementById('inputColor')
const lightenText = document.getElementById('lightenText');
const darkenText = document.getElementById('darkenText');
const toggleBtn = document.getElementById('toggleBtn');
const slider = document.getElementById('slider')
const sliderText = document.getElementById('sliderText')
const alteredColor = document.getElementById('alteredColor');
const alteredColorText = document.getElementById('alteredColorText');
const hexOutput = document.getElementById('hexOutput')
toggleBtn.addEventListener('click', () => {
    if(toggleBtn.classList.contains('toggled')){
      toggleBtn.classList.remove('toggled');
      lightenText.classList.remove('unselected');
      darkenText.classList.add('unselected');
    } else {
      toggleBtn.classList.add('toggled');
      lightenText.classList.add('unselected');
      darkenText.classList.remove('unselected');
    } 
  })


hexInput.addEventListener('keyup',() => {
    const hex = hexInput.value;
if(!validHex(hex)) return;

const stripedHex = hex.replace('#','');
inputColor.style.backgroundColor = "#" + stripedHex;

})




const validHex = (hex) => {
if (!hex) return false;

const stripedHex = hex.replace('#', '')
return stripedHex.length === 3 || stripedHex.length === 6;
}


const hexToRgbconverter = (hex) =>{
    if(!validHex(hex)) return null;

    let stripedHex = hex.replace('#','');
    if(stripedHex.length===3){
        stripedHex = 
        stripedHex[0]+stripedHex[0]
       + stripedHex[1]+stripedHex[1]
       + stripedHex[2]+stripedHex[2]

       
    }
  
    const r  = parseInt(stripedHex.substring(0,2), 16);
    const g  = parseInt(stripedHex.substring(2,4), 16);
    const b  = parseInt(stripedHex.substring(4,6), 16);
    return {r,g,b}
}


 

const rgbToHexConverter = (r,g,b) => {
    const firstPair = ("0"+r.toString(16)).slice(-2)
    const secondPair =  ("0"+g.toString(16)).slice(-2)
    const thirdPair =  ("0"+b.toString(16)).slice(-2)
    const hex = "#" +firstPair + secondPair +thirdPair;
 return hex;
}
const alterColor = (hex, percentage) => {
    const {r, g, b} = hexToRgbconverter(hex);
const amount = Math.floor((percentage/100) * 255);
  
  const newR = increaseWithin0To255(r,amount);
  const newG = increaseWithin0To255(g,amount);
  const newB = increaseWithin0To255(b,amount)
 
  return rgbToHexConverter(newR, newG, newB);
}

const increaseWithin0To255 = (hex, amount) => {
    return Math.min(255, Math.max(0, hex + amount));
    //we can also write it like this
  // const newHex = hex + amount;
  // if(newHex > 255) return 255;
  // if(newHex < 0) return 0;
  // return newHex;
 
}




slider.addEventListener('input',() => {
    sliderText.textContent = `${slider.value}%`
    const valueAddition  = 
    toggleBtn.classList.contains('toggled') ? 
    -slider.value 
    : slider.value;
  
  const alteredHex = alterColor(hexInput.value, valueAddition);
  alteredColor.style.backgroundColor = alteredHex;
   alteredColorText.innerText = alteredHex.toUpperCase(); 

})


