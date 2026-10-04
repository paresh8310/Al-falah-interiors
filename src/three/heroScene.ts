import * as THREE from "three";

/**
 * An elegant architectural "maquette" of a living room:
 * a cutaway room on a plinth with warm soft lighting, slow rotation,
 * mouse parallax and scroll-based depth. Designed to feel like an
 * architectural model, not a game scene.
 *
 * Performance notes:
 *  - One shared BoxGeometry, scaled per mesh (~40 draw calls total)
 *  - DPR capped (1.5 mobile / 2 desktop), shadows disabled on mobile
 *  - Rendering pauses when the canvas is off-screen or the tab is hidden
 *  - prefers-reduced-motion renders a single static frame
 */

export interface HeroSceneOptions {
  mobile: boolean;
  reducedMotion: boolean;
}

export interface HeroSceneHandle {
  dispose(): void;
}

const COLORS = {
  ivory: 0xefe8da,
  oat: 0xe3d9c8,
  beige: 0xd6cab4,
  sand: 0xcfc3ab,
  linen: 0xc4b598,
  walnut: 0x5d4c3b,
  espresso: 0x453a2f,
  charcoal: 0x2b2620,
  sage: 0x6c7355,
  clay: 0xa97f63,
  brass: 0xb08d57,
  glow: 0xffe3b8,
};

function mat(color: number, opts: Partial<THREE.MeshStandardMaterialParameters> = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.88, metalness: 0.03, ...opts });
}

export function createHeroScene(
  container: HTMLElement,
  canvas: HTMLCanvasElement,
  opts: HeroSceneOptions,
): HeroSceneHandle {
  const { mobile, reducedMotion } = opts;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: !mobile,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.shadowMap.enabled = !mobile;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 80);
  const CAM_BASE = new THREE.Vector3(8.1, 5.0, 9.4);
  camera.position.copy(CAM_BASE);

  const group = new THREE.Group();
  scene.add(group);

  /* ---------- materials ---------- */
  const mats = {
    plinth: mat(COLORS.espresso, { roughness: 0.82 }),
    floor: mat(COLORS.ivory, { roughness: 0.94 }),
    wallBack: mat(COLORS.oat),
    wallSide: mat(COLORS.beige),
    mullion: mat(COLORS.espresso),
    rug: mat(COLORS.sand, { roughness: 1 }),
    sofa: mat(COLORS.oat),
    cushion: mat(0xece2d0),
    pillowA: mat(COLORS.clay),
    pillowB: mat(COLORS.sage),
    table: mat(COLORS.walnut, { roughness: 0.7 }),
    brass: mat(COLORS.brass, { roughness: 0.32, metalness: 0.85 }),
    shelf: mat(COLORS.walnut, { roughness: 0.75 }),
    bookA: mat(COLORS.espresso),
    bookB: mat(COLORS.linen),
    frame: mat(COLORS.walnut),
    artInner: mat(0xdfd4bd),
    pot: mat(COLORS.clay, { roughness: 0.95 }),
    plant: mat(COLORS.sage, { roughness: 1 }),
    shade: new THREE.MeshStandardMaterial({
      color: 0xf3e5c6,
      emissive: 0xffd9a0,
      emissiveIntensity: 0.85,
      roughness: 0.6,
    }),
    glow: new THREE.MeshBasicMaterial({ color: 0xffd9a0, toneMapped: false }),
    shadowCatch: new THREE.ShadowMaterial({ opacity: 0.16 }),
  };
  const materials = Object.values(mats) as THREE.Material[];

  /* ---------- geometry helpers ---------- */
  const geoms: THREE.BufferGeometry[] = [];
  const BOX = new THREE.BoxGeometry(1, 1, 1);
  geoms.push(BOX);

  const FLOOR_Y = 0.1; // top of the floor slab

  const box = (
    w: number,
    h: number,
    d: number,
    material: THREE.Material,
    x: number,
    y: number,
    z: number,
    shadows = true,
  ) => {
    const m = new THREE.Mesh(BOX, material);
    m.scale.set(w, h, d);
    m.position.set(x, y, z);
    if (!mobile && shadows) {
      m.castShadow = true;
      m.receiveShadow = true;
    }
    group.add(m);
    return m;
  };

  const cylinder = (rTop: number, rBottom: number, h: number, material: THREE.Material, x: number, y: number, z: number, segments = 24) => {
    const g = new THREE.CylinderGeometry(rTop, rBottom, h, segments);
    geoms.push(g);
    const m = new THREE.Mesh(g, material);
    m.position.set(x, y, z);
    if (!mobile) {
      m.castShadow = true;
      m.receiveShadow = true;
    }
    group.add(m);
    return m;
  };

  /* ---------- plinth, floor, walls ---------- */
  box(8.0, 0.24, 6.0, mats.plinth, 0, -0.12, 0); // plinth
  box(6.9, 0.1, 4.9, mats.floor, 0, 0.05, 0); // floor slab (top = FLOOR_Y)

  // back wall with a large window opening (x: -1.15..1.15, y: 0.7..2.35)
  box(2.3, 3.0, 0.16, mats.wallBack, -2.3, 1.6, -2.15);
  box(2.3, 3.0, 0.16, mats.wallBack, 2.3, 1.6, -2.15);
  box(2.3, 0.6, 0.16, mats.wallBack, 0, 0.4, -2.15); // sill
  box(2.3, 0.65, 0.16, mats.wallBack, 0, 2.675, -2.15); // header
  box(0.05, 1.65, 0.06, mats.mullion, 0, 1.525, -2.12); // mullions
  box(2.3, 0.05, 0.06, mats.mullion, 0, 1.5, -2.12);

  // warm light plane behind the window
  const glowGeo = new THREE.PlaneGeometry(2.9, 2.3);
  geoms.push(glowGeo);
  const glow = new THREE.Mesh(glowGeo, mats.glow);
  glow.position.set(0, 1.55, -2.72);
  group.add(glow);

  // side wall
  box(0.16, 3.0, 4.7, mats.wallSide, -3.45, 1.6, 0.1);

  /* ---------- living set ---------- */
  const rug = box(4.3, 0.035, 2.9, mats.rug, -0.55, FLOOR_Y + 0.017, 0.55, false);
  rug.castShadow = false;

  // sofa (facing +x)
  box(2.1, 0.42, 0.95, mats.sofa, -1.85, FLOOR_Y + 0.21, 0.55);
  box(0.28, 0.85, 0.95, mats.sofa, -2.76, FLOOR_Y + 0.425, 0.55);
  box(2.1, 0.26, 0.16, mats.sofa, -1.85, FLOOR_Y + 0.55, 0.165); // arm (near)
  box(2.1, 0.26, 0.16, mats.sofa, -1.85, FLOOR_Y + 0.55, 0.935); // arm (far)
  box(0.85, 0.16, 0.62, mats.cushion, -2.2, FLOOR_Y + 0.5, 0.55);
  box(0.85, 0.16, 0.62, mats.cushion, -1.35, FLOOR_Y + 0.5, 0.55);
  const pillowA = box(0.34, 0.28, 0.12, mats.pillowA, -2.5, FLOOR_Y + 0.66, 0.38);
  pillowA.rotation.z = 0.12;
  const pillowB = box(0.34, 0.28, 0.12, mats.pillowB, -2.5, FLOOR_Y + 0.66, 0.74);
  pillowB.rotation.z = -0.1;

  // coffee table with brass legs
  box(1.15, 0.07, 0.65, mats.table, 0.35, FLOOR_Y + 0.38, 0.55);
  box(0.06, 0.345, 0.6, mats.brass, -0.1, FLOOR_Y + 0.172, 0.55);
  box(0.06, 0.345, 0.6, mats.brass, 0.8, FLOOR_Y + 0.172, 0.55);
  cylinder(0.07, 0.05, 0.22, mats.pot, 0.12, FLOOR_Y + 0.45, 0.5, 20); // vase
  box(0.28, 0.035, 0.2, mats.bookA, 0.62, FLOOR_Y + 0.432, 0.64);
  box(0.24, 0.035, 0.18, mats.bookB, 0.63, FLOOR_Y + 0.467, 0.65);

  // floor lamp with warm point light
  cylinder(0.16, 0.16, 0.03, mats.brass, -0.45, FLOOR_Y + 0.015, 1.75, 24);
  cylinder(0.02, 0.02, 1.55, mats.brass, -0.45, FLOOR_Y + 0.775, 1.75, 12);
  cylinder(0.19, 0.24, 0.28, mats.shade, -0.45, FLOOR_Y + 1.66, 1.75, 24);
  const lampLight = new THREE.PointLight(0xffd3a0, mobile ? 5 : 8, 5.5, 2);
  lampLight.position.set(-0.45, FLOOR_Y + 1.6, 1.75);
  group.add(lampLight);

  // shelving unit against the back wall
  box(0.05, 1.9, 0.28, mats.shelf, 1.625, FLOOR_Y + 0.95, -1.82);
  box(0.05, 1.9, 0.28, mats.shelf, 2.875, FLOOR_Y + 0.95, -1.82);
  for (const y of [0.14, 0.72, 1.3, 1.88]) {
    box(1.3, 0.045, 0.28, mats.shelf, 2.25, FLOOR_Y + y, -1.82);
  }
  box(0.2, 0.3, 0.16, mats.bookA, 1.92, FLOOR_Y + 0.31, -1.82); // books
  box(0.18, 0.24, 0.16, mats.bookB, 2.14, FLOOR_Y + 0.28, -1.82);
  cylinder(0.06, 0.08, 0.26, mats.pot, 2.6, FLOOR_Y + 0.89, -1.82, 18); // vase on shelf
  const knob = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 12), mats.brass);
  geoms.push(knob.geometry as THREE.SphereGeometry);
  knob.position.set(2.05, FLOOR_Y + 1.49, -1.82);
  group.add(knob);

  // framed art on the side wall
  box(0.045, 1.1, 0.8, mats.frame, -3.34, 1.8, 0.45);
  box(0.02, 0.94, 0.64, mats.artInner, -3.32, 1.8, 0.45);

  // plant in the sunny corner
  cylinder(0.17, 0.13, 0.3, mats.pot, 2.9, FLOOR_Y + 0.15, 1.9, 20);
  const leafGeo = new THREE.IcosahedronGeometry(0.24, 0);
  geoms.push(leafGeo);
  const leafSpots: Array<[number, number, number, number]> = [
    [2.9, 0.72, 1.9, 1],
    [2.72, 0.94, 1.78, 0.78],
    [3.04, 1.02, 2.0, 0.85],
  ];
  for (const [x, y, z, s] of leafSpots) {
    const leaf = new THREE.Mesh(leafGeo, mats.plant);
    leaf.scale.setScalar(s);
    leaf.position.set(x, y, z);
    if (!mobile) leaf.castShadow = true;
    group.add(leaf);
  }

  /* ---------- soft ground shadow ---------- */
  const groundGeo = new THREE.PlaneGeometry(18, 18);
  geoms.push(groundGeo);
  const ground = new THREE.Mesh(groundGeo, mats.shadowCatch);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.26;
  if (!mobile) ground.receiveShadow = true;
  scene.add(ground);

  /* ---------- lights ---------- */
  const hemi = new THREE.HemisphereLight(0xfff6e7, 0x5a4c3d, 1.05);
  scene.add(hemi);
  const amb = new THREE.AmbientLight(0xffffff, 0.22);
  scene.add(amb);
  const dir = new THREE.DirectionalLight(0xffe4c0, 2.6);
  dir.position.set(6, 9, 5);
  if (!mobile) {
    dir.castShadow = true;
    dir.shadow.mapSize.set(1024, 1024);
    dir.shadow.camera.left = -7;
    dir.shadow.camera.right = 7;
    dir.shadow.camera.top = 7;
    dir.shadow.camera.bottom = -6;
    dir.shadow.camera.near = 2;
    dir.shadow.camera.far = 26;
    dir.shadow.bias = -0.0004;
    dir.shadow.normalBias = 0.02;
  }
  scene.add(dir);

  /* ---------- interaction & loop ---------- */
  const pointer = { x: 0, y: 0 };
  const eased = { x: 0, y: 0 };
  const clock = new THREE.Clock();
  let raf = 0;
  let inView = true;
  let pageHidden = document.hidden;
  let disposed = false;

  const onPointerMove = (e: MouseEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  };

  const render = () => {
    const t = clock.getElapsedTime();
    eased.x += (pointer.x - eased.x) * 0.045;
    eased.y += (pointer.y - eased.y) * 0.045;
    const scroll = Math.min(1, Math.max(0, window.scrollY / Math.max(1, window.innerHeight)));

    const sway = reducedMotion ? 0 : 0.14 * Math.sin(t * 0.12);
    group.rotation.y = 0.18 + sway + eased.x * 0.22 + scroll * 0.5;
    group.position.y = scroll * 0.55;
    camera.position.set(
      CAM_BASE.x + eased.x * 0.5,
      CAM_BASE.y - eased.y * 0.3 + scroll * 1.5,
      CAM_BASE.z,
    );
    camera.lookAt(0, 0.85, 0);
    renderer.render(scene, camera);
  };

  const loop = () => {
    raf = requestAnimationFrame(loop);
    if (!inView || pageHidden) return;
    render();
  };

  const resize = () => {
    if (disposed) return;
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    if (reducedMotion) render();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  const io = new IntersectionObserver(
    (entries) => {
      inView = entries.some((e) => e.isIntersecting);
    },
    { threshold: 0 },
  );
  io.observe(container);

  const onVisibility = () => {
    pageHidden = document.hidden;
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);

  if (reducedMotion) {
    render(); // single static frame
  } else {
    loop();
  }

  /* ---------- teardown ---------- */
  return {
    dispose() {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      group.traverse((obj) => {
        if (obj instanceof THREE.Mesh) obj.geometry = obj.geometry; // shared geoms disposed below
      });
      for (const g of geoms) g.dispose();
      for (const m of materials) m.dispose();
      renderer.dispose();
    },
  };
}
