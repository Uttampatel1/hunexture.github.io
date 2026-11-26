// Shared lifecycle for the Lab three.js visualizers: responsive sizing,
// offscreen pause, and full disposal on unmount.

export const disposeScene = (scene) => {
  if (!scene) return;
  scene.traverse((o) => {
    if (o.geometry) o.geometry.dispose();
    const mats = o.material ? (Array.isArray(o.material) ? o.material : [o.material]) : [];
    mats.forEach((m) => {
      if (m.map) m.map.dispose();
      m.dispose();
    });
  });
};

// Watches size + visibility of `container`. Returns { isVisible(), dispose() }.
export const observeViz = (container, { onResize, onVisible } = {}) => {
  let visible = true;
  let ro;
  let io;
  if (typeof ResizeObserver !== 'undefined') {
    ro = new ResizeObserver(() => onResize && onResize());
    ro.observe(container);
  } else {
    window.addEventListener('resize', onResize || (() => {}));
  }
  if (typeof IntersectionObserver !== 'undefined') {
    io = new IntersectionObserver(([e]) => {
      const was = visible;
      visible = e.isIntersecting;
      if (visible && !was && onVisible) onVisible();
    }, { threshold: 0 });
    io.observe(container);
  }
  return {
    isVisible: () => visible && !document.hidden,
    dispose: () => {
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', onResize || (() => {}));
      if (io) io.disconnect();
    },
  };
};

export const fitRenderer = (container, renderer, camera) => {
  const w = container.clientWidth;
  const h = container.clientHeight;
  if (!w || !h) return;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
};

// Full render loop (pauses offscreen). `frame` runs before each render.
export const runViz = ({ container, renderer, camera, scene, controls, frame, onResize }) => {
  let raf = 0;
  let running = false;
  const resize = () => {
    fitRenderer(container, renderer, camera);
    if (onResize) onResize();
    if (!running) renderer.render(scene, camera);
  };
  const tick = () => {
    if (!viz.isVisible()) { running = false; return; }
    raf = requestAnimationFrame(tick);
    if (controls) controls.update();
    if (frame) frame();
    renderer.render(scene, camera);
  };
  const start = () => {
    if (running) return;
    running = true;
    tick();
  };
  const viz = observeViz(container, { onResize: resize, onVisible: start });
  document.addEventListener('visibilitychange', start);
  fitRenderer(container, renderer, camera);
  start();
  return () => {
    running = false;
    cancelAnimationFrame(raf);
    document.removeEventListener('visibilitychange', start);
    viz.dispose();
    if (controls) controls.dispose();
    disposeScene(scene);
    renderer.dispose();
    if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
  };
};
