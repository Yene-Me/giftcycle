var offersListName = 'offersList';
var offersListComp;

$('#offerListPage').bind('pageinit', function(event) {
	offersListComp = $('#' + offersListName);
});

function offersLoaded(result) {
	$.mobile.hidePageLoadingMsg();
	
	if (!result.error)
		populateOffers($(result.xmlDocument));
	else
		itemsRequestError();
}

function populateOffers(offersXML)
{
	$('#'+offersListName+' li').remove();
	offersXML.find("item").each(populateSingleOffer);
	offersListComp.listview('refresh');
}

function populateSingleOffer() {
	var offerNode = $(this);
	
	offersListComp.append('<li><a href="' + offerNode.find("link").text() + '" rel="external">' +
			'<h4>' + offerNode.find("title").text() + '</h4>' +
			'<p>' + offerNode.find("location").text() + '</p>' +
			'<span class="ui-li-count">' + $.format.date(offerNode.find("pubDate").text(), "dd MMMM") + '</span></a></li>');
}

function itemsRequestError(jqXHR, textStatus, errorThrown) {
	alert("Oops, error loading the items. Please make sure your network is working properly. Error: " + errorThrown);
}