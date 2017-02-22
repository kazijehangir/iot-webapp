const socket = io()
var dataJSON = {}

socket.on('to_client', data => {
    dataJSON = data
})

function applyRules() {
    console.log('Apply rules ')
    console.log($('#flow1').parent())
    console.log($('#flow2').parent())
    dataJSON[0]['policy'] = $('#flow1').parent()[0].id
    dataJSON[1]['policy'] = $('#flow2').parent()[0].id
    socket.emit('to_server', dataJSON)
}
function resetRules() {
    console.log('Resetting...')
}
function connectToFloodlight() {
    
}
$('document').ready(init);
    function init (){                      
        $('#flow1, #flow2').bind('dragstart', function(event) {
        event.originalEvent.dataTransfer.setData("text/plain", event.target.getAttribute('id'))
    // bind the dragover event on the board sections                 
    })
    connectToFloodlight()
    $('#applyButton').click(() => applyRules())
    
    $('#resetButton').click(() => resetRules())     
    
    $('#freeflowing, #scrub, #coursegrain1, #coursegrain2, #coursegrain3').bind('dragover', function(event) {                          
        event.preventDefault();
    }) // bind the drop event on the board sections                      
    
    $('#freeflowing, #scrub, #coursegrain1, #coursegrain2, #coursegrain3').bind('drop', function(event) {                          
        var notecard = event.originalEvent.dataTransfer.getData("text/plain")                          
        event.target.appendChild(document.getElementById(notecard))
    // Turn off the default behaviour                        
    // without this, FF will try and go to a URL with your id's name                          
        event.preventDefault()
    })
}
