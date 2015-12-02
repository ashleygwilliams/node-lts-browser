var src_url = "https://nodejs.org/download/release/index.json";

$(requestJSON(src_url, function(data) {
  var results = $('#results');
  var submit_btn = $('#submit_btn');
  var version_list = $('#versions');
  var major_minor = "";

  for(var i=0; i<data.length; i++) {
    var version = data[i].version;
    var major_minor_new = get_major_minor(version);
    if (major_minor_new !== major_minor) {
      major_minor = major_minor_new;
      version_list.append('<h3>' + major_minor + '</h3>');
    }    
    var list_tmpl = ' * ' +
                    '<a href="#" id="' + version + '">' +
                    version +
                    '</a>';
    version_list.append(list_tmpl);
  }

  function get_major_minor(v_str) {
    var nums = v_str.split('.');
    return nums[0] + '.' + nums[1];
  }

  $('a').click(function(e){
    e.preventDefault();
    var version_input = $(this).attr('id');
    var version_data = get_version_data(data, version_input);
    if (version_data) {
      var version_html = version_template(version_data);
      results.html(version_html);
      lts_template(version_data.lts);
    } else {
      results.text('version not found.');
    }
  })

  submit_btn.click(function(e){
    e.preventDefault();
    var version_input = $('#version_input').val();
    var version_data = get_version_data(data, version_input);
    if (version_data) {
      var version_html = version_template(version_data);
      results.html(version_html);
      lts_template(version_data.lts);
    } else {
      results.text('version not found.');
    }
  })

  function get_version_data(data, version) {
    for(var i=0; i<data.length; i++) {
      if (data[i].version === version_string(version)) {
        return data[i];
      }
    }
  }

  function version_string(v_str) {
    if (v_str.charAt(0) === 'v') {
      return v_str;
    } else {
      return 'v' + v_str;
    }
  }

  function version_template(data) {
    return  '<h2>' + data.version + '</h2>' +
            '<h2 id="lts"> LTS: ' + data.lts + '</h2>' +
            '<h2 id="data"> Date Released: ' + data.date + '</h2>'
  }

  function lts_template(lts) {
    var lts_element = $('#lts');
    if (lts) {
      lts_element.addClass('text-info');
    } else {
      lts_element.addClass('text-danger');
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
