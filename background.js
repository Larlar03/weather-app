//Start from 0 degrees on the page
let angle = 0;

let changeBackground = function() {
    //Increse the angle by x
  angle = angle + 1.5;

  let container = document.getElementById('background');

  /*In the body change the background image to a linear gradient. The gradient degree will be a string with the angle variable in.
  */
  container.style.backgroundImage = 'linear-gradient(' + angle + 'deg, #90D3F1, #35C5B4)'

  //Changes the background on every frame of the page.
  requestAnimationFrame(changeBackground)
}

changeBackground();
