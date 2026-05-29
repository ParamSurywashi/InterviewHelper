'use client'
import { useEffect, useRef, useCallback } from 'react'
interface Props { className?:string; intensity?:number; color?:[number,number,number] }
export function WaterRipple({ className='', intensity=256, color=[70,105,250] }:Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bufA = useRef<Float32Array|null>(null), bufB = useRef<Float32Array|null>(null)
  const raf = useRef(0), W = useRef(0), H = useRef(0)
  const drop = useCallback((x:number,y:number,r=6,str=512)=>{
    const w=W.current,h=H.current,buf=bufA.current; if(!buf) return
    for(let dy=-r;dy<=r;dy++) for(let dx=-r;dx<=r;dx++)
      if(dx*dx+dy*dy<=r*r){const nx=x+dx,ny=y+dy; if(nx>=0&&nx<w&&ny>=0&&ny<h) buf[ny*w+nx]=str}
  },[])
  useEffect(()=>{
    const canvas=canvasRef.current; if(!canvas) return
    const ctx=canvas.getContext('2d',{willReadFrequently:true})!
    const resize=()=>{
      const rect=canvas.parentElement!.getBoundingClientRect(), sc=0.5
      canvas.width=Math.floor(rect.width*sc); canvas.height=Math.floor(rect.height*sc)
      W.current=canvas.width; H.current=canvas.height
      bufA.current=new Float32Array(canvas.width*canvas.height)
      bufB.current=new Float32Array(canvas.width*canvas.height)
    }
    resize()
    const ai=setInterval(()=>{ const w=W.current,h=H.current; drop(Math.random()*w|0,Math.random()*h|0,4,intensity) },800)
    const onMove=(e:MouseEvent)=>{ const rect=canvas.parentElement!.getBoundingClientRect(),sc=canvas.width/rect.width; drop((e.clientX-rect.left)*sc|0,(e.clientY-rect.top)*sc|0,3,intensity*0.5) }
    const onClick=(e:MouseEvent)=>{ const rect=canvas.parentElement!.getBoundingClientRect(),sc=canvas.width/rect.width; drop((e.clientX-rect.left)*sc|0,(e.clientY-rect.top)*sc|0,8,intensity) }
    canvas.parentElement!.addEventListener('mousemove',onMove)
    canvas.parentElement!.addEventListener('click',onClick)
    const [r,g,b]=color
    const render=()=>{
      const w=W.current,h=H.current,a=bufA.current,bk=bufB.current
      if(!a||!bk){raf.current=requestAnimationFrame(render);return}
      for(let y=1;y<h-1;y++) for(let x=1;x<w-1;x++){const i=y*w+x; bk[i]=(a[i-1]+a[i+1]+a[i-w]+a[i+w])/2-bk[i]; bk[i]*=0.985}
      const tmp=bufA.current; bufA.current=bufB.current; bufB.current=tmp
      const img=ctx.createImageData(w,h),d=img.data
      for(let i=0;i<w*h;i++){const v=bufB.current![i],t=Math.max(0,Math.min(1,v/intensity)); d[i*4]=r+(255-r)*t; d[i*4+1]=g+(255-g)*t*0.7; d[i*4+2]=b+(255-b)*t*0.4; d[i*4+3]=Math.round(t*160)}
      ctx.putImageData(img,0,0); raf.current=requestAnimationFrame(render)
    }
    raf.current=requestAnimationFrame(render)
    const ro=new ResizeObserver(resize); ro.observe(canvas.parentElement!)
    return()=>{ cancelAnimationFrame(raf.current); clearInterval(ai); canvas.parentElement?.removeEventListener('mousemove',onMove); canvas.parentElement?.removeEventListener('click',onClick); ro.disconnect() }
  },[drop,intensity,color])
  return <canvas ref={canvasRef} id="water-canvas" className={className} />
}