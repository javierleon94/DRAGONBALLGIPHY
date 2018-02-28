var dragonballTitle = ['Goku', 'Gohan', 'Goten', 'Master Roshi', 'Bulma', 'Nimbus DB', 'Seven Dragon Balls', 'Dragon Ball Super', 'Beerus', 'Whis', 'Zeno Sama', 'Piccolo', 'Vegeta', 'Super Saiyan God', 'Super Saiyan Blue'];
var currentGif; var pausedGif; var animatedGif; 

//creates buttons
function createButtons(){
	$('#DbButtons').empty();
	for(var i = 0; i < dragonballTitle.length; i++){
		var DbBtn = $('<button>').text(dragonballTitle[i]).addClass('DbBtn').attr({'data-name': dragonballTitle[i]});
		$('#DbButtons').append(DbBtn);
	}

	//displays gifs on click
	$('.DbBtn').on('click', function(){
		$('.display').empty();

		var DbSearch = $(this).data('name');
		var giphyURL = "https://api.giphy.com/v1/gifs/search?q=dragon+ball+" + DbSearch + "&limit=10&api_key=dc6zaTOxFJmzC";
		$.ajax({url: giphyURL, method: 'GET'}).done(function(giphy){
			currentGif = giphy.data;
			$.each(currentGif, function(index,value){
				animatedGif= value.images.original.url;
				pausedGif = value.images.original_still.url;
				var stillGif= $('<img>').attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnHover');
				var fullGifDisplay = $('<button>').append(stillGif);
				$('.display').append(fullGifDisplay);
			});
		});
	});
}

//animates and pauses gif on hover
$(document).on('mouseover','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('animated'));
 });
 $(document).on('mouseleave','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('paused'));
 });

//sets a button from input
$('#addDBCharacter').on('click', function(){
	var newShow = $('#newDbInput').val().trim();
	dragonballTitle.push(newShow);
	createButtons();
	return false;
});

createButtons();