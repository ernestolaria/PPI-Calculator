 
let button = document.getElementById('button');

//event listeners
button.addEventListener('click', perform);

clear.addEventListener('click', () => {
    let forms = [...document.forms];
    forms.forEach(form => form.reset());
    clearInfo()
})

//clear result info and error alerts
function clearInfo(){
    document.getElementById('result').innerHTML = '';
    document.getElementById('horizontalPx_error').innerHTML = '';
    document.getElementById('verticalPx_error').innerHTML = '';
    document.getElementById('size_error').innerHTML = '';
}

//perform the action (calculate, or print the wrong entry if needed)
function perform(){
    let status;
    
    if(getInputs(status)==false){
        printResult();
    }else{
        getInputs();
    }
}    

//get values and validate
function getInputs(status){
   
    const x = parseInt(document.getElementById('horizontalPx').value);
    const y = parseInt(document.getElementById('verticalPx').value);
    const inches = parseInt(document.getElementById('diagonalInch').value);
    
    let x_status=false, y_status=false, inches_status=false;

    if(x === '' || isNaN(x) || (x <=0)){
        document.getElementById('horizontalPx_error').innerHTML = 'wrong entry';
    }else{
        document.getElementById('horizontalPx_error').innerHTML = '';
        x_status=true;
    }

    if(y === '' || isNaN(y) || (y <=0)){
        document.getElementById('verticalPx_error').innerHTML = 'wrong entry';
    }else{
        document.getElementById('verticalPx_error').innerHTML = '';
        y_status=true;
    }

    if(inches === '' || isNaN(inches) || (inches <=0)){
        document.getElementById('size_error').innerHTML = 'wrong entry';
    }else{
        document.getElementById('size_error').innerHTML = '';
        inches_status=true;
    }

    if(x_status && y_status && inches_status){
        calculatePPI(x, y, inches);
    }else{    
        status = false;
    } 
    
    return status
}

//calculate and print the result
function calculatePPI(x, y, inches){
    
    let hyp = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
   
    let ppi = (hyp / inches).toFixed(2); 
    let ppi2 = (Math.pow(hyp / inches, 2)).toFixed(2);
    let diagonal = hyp.toFixed(2); 
    let dot_pitch = (( inches / hyp) * 25.4).toFixed(4);
    let total_pixel = (x * y).toLocaleString("en-US");

    return printResult({ppi,ppi2,diagonal,dot_pitch,total_pixel});

}

//print the result
function printResult(values){

    const result = document.getElementById('result'); 

    if(values){
        result.innerHTML = 'PPI: ' + values.ppi 
                         + '<br>PPI<sup>2</sup>: ' + values.ppi2 
                         + '<br>Diagonal: ' + values.diagonal
                         + '<br>Dot Pitch: ' + values.dot_pitch
                         + '<br>Total Pixels: ' + values.total_pixel;
    }else{
        result.innerHTML = 'check your entry';
    }
}
