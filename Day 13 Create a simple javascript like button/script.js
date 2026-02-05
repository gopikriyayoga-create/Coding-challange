let count=0

var button=document.getElementById('likebtn');
var countit=document.getElementById('count');

function Likes() {
    count++;
    countit.textContent=count;
    
}