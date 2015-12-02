var src_url = "https://nodejs.org/download/release/index.json";

$(requestJSON(src_url, function(data) {
  var results = $('#results');
  var submit_btn = $('#submit_btn');

  submit_btn.click(function(e){
    e.preventDefault();
    var version_input = $('#version_input').val();
    var version_data = get_version_data(data, version_input);
    results.text(JSON.stringify(version_data));
  })

  function get_version_data(data, version) {
    for(var i=0; i<data.length; i++) {
      var v_vers = "v" + version;
      if (data[i].version === v_vers) {
        return data[i];
      } else {
        return "version " + version + " not found.";         
      }
    }
  } 
 
}));

function requestJSON(url, callback) {
  $.ajax({
    url: url,
    complete: function(xhr) {
      callback.call(null, xhr.responseJSON);
    }
  });
}
