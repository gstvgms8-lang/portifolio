'use client';

import { useRef } from 'react';

export default function GlowSurface({ as: Tag = 'div', className = '', children, ...props }) {
  const ref = useRef(null);

  function handlePointerMove(event) {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    node.style.setProperty('--glow-x', `${event.clientX - rect.left}px`);
    node.style.setProperty('--glow-y', `${event.clientY - rect.top}px`);
    node.style.setProperty('--glow-opacity', '1');
  }

  function handlePointerLeave() {
    ref.current?.style.setProperty('--glow-opacity', '0');
  }

  return (
    <Tag
      ref={ref}
      className={`border-glow ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      {children}
    </Tag>
  );
}
