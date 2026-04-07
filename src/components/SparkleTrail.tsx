import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  life: number
  decay: number
  color: string
}

const COLORS = ['#f97316', '#ec4899', '#a855f7', '#fbbf24', '#ffc0cb']
const MAX_PARTICLES = 150

export default function SparkleTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []
    let animationId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    const onMouseMove = (e: MouseEvent) => {
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.7) * 1.5,
          size: Math.random() * 3 + 1,
          life: 1,
          decay: Math.random() * 0.03 + 0.015,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        })
      }
      if (particles.length > MAX_PARTICLES) {
        particles = particles.slice(-MAX_PARTICLES)
      }
    }

    const drawStar = (x: number, y: number, size: number) => {
      ctx!.beginPath()
      for (let i = 0; i < 4; i++) {
        const outerAngle = (Math.PI / 4) * (i * 2) - Math.PI / 2
        const innerAngle = outerAngle + Math.PI / 4
        const outerX = x + Math.cos(outerAngle) * size
        const outerY = y + Math.sin(outerAngle) * size
        const innerX = x + Math.cos(innerAngle) * size * 0.4
        const innerY = y + Math.sin(innerAngle) * size * 0.4
        if (i === 0) {
          ctx!.moveTo(outerX, outerY)
        } else {
          ctx!.lineTo(outerX, outerY)
        }
        ctx!.lineTo(innerX, innerY)
      }
      ctx!.closePath()
      ctx!.fill()
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles = particles.filter((p) => {
        p.x += p.vx
        p.y += p.vy
        p.life -= p.decay

        if (p.life <= 0) return false

        ctx.globalAlpha = p.life
        ctx.fillStyle = p.color
        drawStar(p.x, p.y, p.size)

        return true
      })

      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(draw)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', resize)
    animationId = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  )
}
