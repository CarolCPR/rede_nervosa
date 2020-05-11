try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch(e) {
  console.error(e);
  $('.no-browser-support').show();
  $('.app').hide();
}

var noteTextarea = $('#note-textarea');
var instructions = $('#recording-instructions');
var transcript;
var imageTranslate = $('#image-translate');
var gravar = $('#start-record-btn');

recognition.continuous = true;

recognition.onresult = function(event) {
  var current = event.resultIndex;

  transcript = event.results[current][0].transcript;

  var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

  if(!mobileRepeatBug) {
    noteContent = transcript;
    noteTextarea.val(noteContent);
  }

  console.log(transcript);
  if(transcript) recognition.stop();
};

recognition.onstart = function() { 
  instructions.text('Ouvindo...');
}

recognition.onspeechend = function() {
  if(!transcript) instructions.text('Tente novamente!');
  else {
    console.log("Ok");
    imageTranslate.text(transcript);
    gravar.text('De novo');
    instructions.text('Clique em De novo para gravar outra vez.')
  }
}

recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions.text('Não escuto...');  
  };
}

$('#start-record-btn').on('click', function(e) {
  recognition.start();
});

noteTextarea.on('input', function() {
  noteContent = $(this).val();
});