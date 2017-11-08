(function() {

  var output = document.querySelector('.output'),
    input = document.querySelector('input'),
    button = document.querySelector('button'),
    avatar = document.querySelector('.avatar'),
    presence = document.querySelector('.presence');
  var channel = 'simple-chat';

  // Assign a random avatar in random color
  avatar.className = 'face-' + ((Math.random() * 13 + 1) >>> 0) + ' color-' + ((Math.random() * 10 + 1) >>> 0);

  var p = PUBNUB.init({
    subscribe_key: 'sub-c-182105ac-0001-11e5-8fd4-0619f8945a4f',
    publish_key: 'pub-c-ce04f67b-0f26-43ce-8be2-192e9821d1a3',
    ssl: true
  });

  p.subscribe({
    channel: channel,
    callback: function(m) {
      output.innerHTML = '<p><i class="' + m.avatar + '"></i><span>;
    },
    presence: function(m) {
      if (m.occupancy > 1) {
        presence.textContent = m.occupancy + ' people online';
      } else {
        presence.textContent = 'Nobody else is online';
      }
    }
  });

  input.addEventListener('keyup', function(e) {
    (e.keyCode || e.charCode) === 13 && send()
  }, false);
 button.addEventListener('click', send, false);

  function send() {
    p.publish({
      channel: channel,
      message: {
        avatar: avatar.className,
        text: input.value
      },
      callback: function(){input.value = '';}
    });
  }

})();
