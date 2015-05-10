// function to hide the user interface when 'Toggle UI' is pressed
function toggleAll() {
	$( ".btn-group" ).fadeToggle( "slow", "linear" );
	$( "#QueryListing" ).fadeToggle( "slow", "linear" );
	$( ".btn btn-danger" ).fadeToggle( "slow", "linear" );
	$( ".dropdown" ).fadeToggle( "slow", "linear" );
	$( ".form-group" ).fadeToggle( "slow", "linear" );
	$( "#submit" ).fadeToggle( "slow", "linear" );
	$( ".input-group" ).fadeToggle( "slow","linear");
}