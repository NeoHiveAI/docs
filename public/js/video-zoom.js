// Click-to-expand for documentation videos.
//
// starlight-image-zoom (medium-zoom) only handles <img>, so the docs' <video>
// walkthroughs need their own handler. This mirrors that UX: content videos get
// a zoom-in cursor, and clicking one opens it enlarged in a dimmed overlay with
// native controls. Click the backdrop, the close button, or press Escape to
// dismiss. Uses event delegation so videos inside (initially hidden) tab panels
// work too, and re-binds on each MPA page load.
(function () {
  var lastFocus = null;

  function openZoom(video) {
    lastFocus = document.activeElement;

    var overlay = document.createElement('div');
    overlay.className = 'neo-zoom-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Expanded video');

    var clone = video.cloneNode(true);
    clone.className = 'neo-zoom-video';
    clone.removeAttribute('width');
    clone.controls = true;
    clone.muted = true;
    clone.autoplay = true;
    clone.loop = true;

    var close = document.createElement('button');
    close.type = 'button';
    close.className = 'neo-zoom-close';
    close.setAttribute('aria-label', 'Close expanded video');
    close.innerHTML = '×';

    overlay.appendChild(clone);
    overlay.appendChild(close);
    document.body.appendChild(overlay);
    document.documentElement.style.overflow = 'hidden';

    var playing = clone.play && clone.play();
    if (playing && playing.catch) playing.catch(function () {});
    close.focus();

    function dismiss() {
      document.documentElement.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      overlay.remove();
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    function onKey(e) { if (e.key === 'Escape') dismiss(); }

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target === close) dismiss();
    });
    document.addEventListener('keydown', onKey);
  }

  document.addEventListener('click', function (e) {
    var target = e.target;
    if (!target || !target.closest) return;
    var video = target.closest('.sl-markdown-content video');
    if (!video || video.controls) return;
    e.preventDefault();
    openZoom(video);
  });
})();
