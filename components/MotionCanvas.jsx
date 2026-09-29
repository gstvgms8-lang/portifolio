'use client';

import { useEffect, useRef } from 'react';

function setupCanvas(canvas, variant, interactive) {
  const ctx = canvas.getContext('2d');
  let frame = 0;
  let raf = 0;
  let running = true;
  let pointer = { x: 0.5, y: 0.5, active: false };
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawFloatingLines(w, h, t) {
    ctx.clearRect(0, 0, w, h);
    ctx.globalAlpha = 0.9;
    for (let j = 0; j < 8; j++) {
      ctx.beginPath();
      const base = h * (0.2 + j * 0.085);
      for (let x = -30; x <= w + 30; x += 12) {
        const y = base + Math.sin(x * 0.012 + t * 0.0015 + j) * (18 + j * 2) + Math.cos(x * 0.006 - t * 0.001) * 9;
        if (x === -30) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `hsla(${190 + j * 7}, 92%, 68%, ${0.15 + j * 0.02})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }
  }

  function drawBlaze(w, h, t) {
    ctx.clearRect(0, 0, w, h);
    const grd = ctx.createLinearGradient(0, h, 0, 0);
    grd.addColorStop(0, 'rgba(255,90,20,.35)');
    grd.addColorStop(.45, 'rgba(255,140,30,.12)');
    grd.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 42; i++) {
      const seed = (i * 53) % 97;
      const x = ((seed / 97) * w + Math.sin(t * 0.0007 + i) * 18 + w) % w;
      const y = h - ((t * (0.025 + (i % 5) * 0.003) + i * 47) % (h + 80));
      const r = 1 + (i % 4) * 0.7;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,${130 + (i % 4) * 25},50,${0.15 + (i % 3) * 0.12})`;
      ctx.fill();
    }
  }

  function drawLiquid(w, h, t) {
    ctx.clearRect(0, 0, w, h);
    const g = ctx.createRadialGradient(
      w * (0.45 + Math.sin(t * 0.0004) * 0.1),
      h * (0.5 + Math.cos(t * 0.0005) * 0.08),
      0,
      w * 0.5, h * 0.5, Math.max(w, h) * 0.7
    );
    g.addColorStop(0, 'rgba(124,58,237,.42)');
    g.addColorStop(.45, 'rgba(14,165,233,.18)');
    g.addColorStop(1, 'rgba(4,6,12,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,w,h);
    for (let i=0;i<7;i++) {
      ctx.beginPath();
      for (let x=0;x<=w;x+=10) {
        const y = h*(.18+i*.11)+Math.sin(x*.018+t*.001+i)*22+Math.cos(x*.007-t*.0008+i)*12;
        if (x===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      }
      ctx.strokeStyle = `rgba(110,210,255,${.05+i*.012})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  function drawFrost(w,h,t) {
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle='rgba(185,230,255,.055)';
    ctx.fillRect(0,0,w,h);
    for(let i=0;i<110;i++){
      const x=(i*97)%w;
      const y=(i*47)%h;
      const len=8+(i%9)*2;
      ctx.beginPath();
      ctx.moveTo(x,y);
      ctx.lineTo(x+Math.cos(i)*len,y+Math.sin(i)*len);
      ctx.strokeStyle=`rgba(220,245,255,${.035+(i%5)*.01})`;
      ctx.stroke();
    }
  }

  function drawDroplets(w,h,t) {
    ctx.clearRect(0,0,w,h);
    for(let i=0;i<58;i++){
      const x=(i*83)%w;
      const drift=Math.sin(t*.0006+i)*6;
      const y=((i*51+t*(.01+(i%4)*.002))%(h+40))-20;
      const r=2+(i%6);
      ctx.beginPath();
      ctx.ellipse(x+drift,y,r,r*1.5,0,0,Math.PI*2);
      ctx.fillStyle='rgba(210,240,255,.08)';
      ctx.fill();
      ctx.strokeStyle='rgba(255,255,255,.12)';
      ctx.stroke();
    }
    if (interactive && pointer.active) {
      const px=pointer.x*w, py=pointer.y*h;
      const rg=ctx.createRadialGradient(px,py,0,px,py,90);
      rg.addColorStop(0,'rgba(3,5,10,.5)');
      rg.addColorStop(1,'rgba(3,5,10,0)');
      ctx.fillStyle=rg; ctx.fillRect(0,0,w,h);
    }
  }

  function render(t) {
    if (!running) return;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width, h = rect.height;
    frame = t;
    if (variant === 'blaze') drawBlaze(w,h,t);
    else if (variant === 'liquid') drawLiquid(w,h,t);
    else if (variant === 'frost') drawFrost(w,h,t);
    else if (variant === 'droplets') drawDroplets(w,h,t);
    else drawFloatingLines(w,h,t);
    raf = requestAnimationFrame(render);
  }

  function onPointer(e) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = (e.clientX - rect.left) / rect.width;
    pointer.y = (e.clientY - rect.top) / rect.height;
    pointer.active = true;
  }
  function leave(){ pointer.active = false; }

  resize();
  window.addEventListener('resize', resize);
  if (interactive) {
    canvas.addEventListener('pointermove', onPointer);
    canvas.addEventListener('pointerleave', leave);
  }

  const io = new IntersectionObserver(([entry]) => {
    running = entry.isIntersecting && !document.hidden;
    if (running) {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(render);
    }
  }, { threshold: 0.01 });
  io.observe(canvas);

  function visibility() {
    running = !document.hidden && canvas.getBoundingClientRect().bottom > 0 && canvas.getBoundingClientRect().top < innerHeight;
    if (running) {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(render);
    }
  }
  document.addEventListener('visibilitychange', visibility);
  raf = requestAnimationFrame(render);

  return () => {
    running = false;
    cancelAnimationFrame(raf);
    io.disconnect();
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', visibility);
    if (interactive) {
      canvas.removeEventListener('pointermove', onPointer);
      canvas.removeEventListener('pointerleave', leave);
    }
  };
}

export default function MotionCanvas({ variant = 'floating-lines', interactive = false, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !ref.current) return;
    return setupCanvas(ref.current, variant, interactive);
  }, [variant, interactive]);

  return <canvas ref={ref} className={`motion-canvas motion-${variant} ${className}`} aria-hidden="true" />;
}
