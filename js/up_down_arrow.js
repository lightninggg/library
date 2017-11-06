var up = document.getElementById('up-arrow');
var upStatus = 0;

up.addEventListener('click',function(){
	if(upStatus === 0){
		var container = document.getElementById('container');
		container.setAttribute('class', 'folded');
		up.style.backgroundImage = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAYCAYAAAARfGZ1AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHZSURBVEiJ7ZQ/ixpRFMXPeY6za7IEbbS1EGysUk0TkFjkI1imShFIioVASJsqW2wT8gW2TSsypBCLBLExEBgQ2cxodDdYKBhHDZv5c1Ooi4juGsIWCXvhNo97fu+++857FBHcVKgbI9/C/z84ROQyAahMJnMvn88fAIgB2AegA4guMrJoiAC4qt2UXPU5yT3DMB6l0+kHmqYpEQkWDTAMw8u6MAxJEiIiSikEQRAdjUY/Go3G8XA4HC/rtLVTXBiG0dR1/XkqlXqo6/rPMAw535cQES67XqxRRCKz2cydTqdPVsHAhpnX6/XTyWTy0nXdLyTvRiKRO0qpGMkYyX0AeyR1klEAmud5F7ZtvyiXy+/XWdz2/AuFwv1sNnsSj8dzMi8iyXBxQkUSnuf5rVbrValUOpYNoK1uqVQqn9vt9tPxePxVKbUcC0SESin4vh82m80jx3HebgJfCQcA0zQ/2bb9zHXdbyRBUiml6Pt+4DjOu06n88ayrF/b9Nf63DTND91u99B13e+apsHzPHEc56TX6722LGtylXbrzNejWCw+TiaTR4PB4GO/3z+sVqtn12l2hudyuYNEImEEQdCs1Wrnu2h2hgNzu2y7vL+G/2n8u7/iLXxj/AYhQQQGkT/xPgAAAABJRU5ErkJggg==)';
        up.style.cursor = 's-resize'; 
	} else{
		$('#container_temp').empty();
		$('#container_temp').hide();
		var container = document.getElementById('container');
		container.removeAttribute('class');
		up.style.backgroundImage = 'url(data:image/gif;base64,R0lGODlhFgAVALMAAGNkZuLi44CBg5SVlru8vPb29tjZ2aioqW1ucIqLjOrq6sXFxgAAAAAAAAAAAAAAACH5BAAHAP8ALAAAAAAWABUAAARBUMlJq7046837LYVnJYlIEQBAmEqQpoEpvIAgHnR6dEb+GpsCwpdChDID4muQWShpi8+ARBUIqKTBkcXter9gUwQAOw==)';
        up.style.cursor = 'n-resize';
	}
	upStatus = ~ upStatus;
}); 

