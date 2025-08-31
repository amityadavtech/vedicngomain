"use client"

import { useEffect, useRef } from "react"

function toDevanagari(num: number) {
  const map = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"]
  return num
    .toString()
    .split("")
    .map((d) => map[Number.parseInt(d, 10)])
    .join("")
}

export default function VedicClock() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    const size = Math.min(window.innerWidth < 480 ? 220 : 280, 320)
    canvas.width = size
    canvas.height = size
    const radius = size / 2
    ctx.translate(radius, radius)

    const draw = () => {
      // background
      ctx.clearRect(-radius, -radius, size, size)
      // dial
      const grad = ctx.createRadialGradient(0, 0, radius * 0.1, 0, 0, radius)
      grad.addColorStop(0, "#ffe8c2")
      grad.addColorStop(1, "#ffb347")
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(0, 0, radius * 0.98, 0, Math.PI * 2)
      ctx.fill()

      // outer ring
      ctx.strokeStyle = "#bf360c"
      ctx.lineWidth = radius * 0.03
      ctx.beginPath()
      ctx.arc(0, 0, radius * 0.95, 0, Math.PI * 2)
      ctx.stroke()

      // center bindu
      ctx.fillStyle = "#8b4513"
      ctx.beginPath()
      ctx.arc(0, 0, radius * 0.04, 0, Math.PI * 2)
      ctx.fill()

      // hour markers with Devanagari numerals
      ctx.fillStyle = "#5c2a00"
      ctx.font = `${radius * 0.18}px serif`
      ctx.textBaseline = "middle"
      ctx.textAlign = "center"
      for (let num = 1; num <= 12; num++) {
        const ang = (num * Math.PI) / 6
        const x = Math.cos(ang - Math.PI / 2) * radius * 0.75
        const y = Math.sin(ang - Math.PI / 2) * radius * 0.75
        ctx.fillText(toDevanagari(num), x, y)
      }

      // minor ticks
      for (let i = 0; i < 60; i++) {
        const ang = (i * Math.PI) / 30
        const inner = i % 5 === 0 ? radius * 0.84 : radius * 0.9
        ctx.strokeStyle = i % 5 === 0 ? "#8b4513" : "#d2691e"
        ctx.lineWidth = i % 5 === 0 ? 3 : 1
        ctx.beginPath()
        ctx.moveTo(Math.cos(ang) * inner, Math.sin(ang) * inner)
        ctx.lineTo(Math.cos(ang) * (radius * 0.95), Math.sin(ang) * (radius * 0.95))
        ctx.stroke()
      }

      // hands
      const now = new Date()
      let hour = now.getHours()
      const minute = now.getMinutes()
      const second = now.getSeconds()
      hour = hour % 12
      // hour hand
      drawHand(((hour + minute / 60) * Math.PI) / 6, radius * 0.5, radius * 0.06, "#5c2a00")
      // minute hand
      drawHand(((minute + second / 60) * Math.PI) / 30, radius * 0.7, radius * 0.04, "#8b4513")
      // second hand (saffron)
      drawHand((second * Math.PI) / 30, radius * 0.8, radius * 0.02, "#ff6f00")
    }

    function drawHand(pos: number, length: number, width: number, color: string) {
      ctx.strokeStyle = color
      ctx.lineWidth = width
      ctx.lineCap = "round"
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(Math.cos(pos - Math.PI / 2) * length, Math.sin(pos - Math.PI / 2) * length)
      ctx.stroke()
    }

    draw()
    const timer = setInterval(draw, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <canvas ref={canvasRef} className="rounded-full shadow-xl ring-8 ring-saffron-200" />
      <div className="text-center mt-3">
        <p className="text-saffron-700 font-bold text-xl">कालचक्र</p>
        <p className="text-gray-600 text-sm">देवनागरी अंकों सहित वैदिक घड़ी</p>
      </div>
    </div>
  )
}
