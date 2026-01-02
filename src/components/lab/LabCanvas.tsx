import { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { RotateCcw, Play, Pause } from 'lucide-react';

interface OhmsLawState {
  voltage: number;
  resistance: number;
  current: number;
  isRunning: boolean;
}

export function LabCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<OhmsLawState>({
    voltage: 5,
    resistance: 100,
    current: 0.05,
    isRunning: false,
  });

  const calculateCurrent = useCallback((voltage: number, resistance: number) => {
    return resistance > 0 ? voltage / resistance : 0;
  }, []);

  const drawCircuit = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    
    // Background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const circuitWidth = Math.min(width * 0.7, 400);
    const circuitHeight = Math.min(height * 0.5, 200);

    ctx.strokeStyle = state.isRunning ? '#0ea5e9' : '#64748b';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    // Draw circuit path
    ctx.beginPath();
    
    // Top wire
    ctx.moveTo(centerX - circuitWidth / 2, centerY - circuitHeight / 2);
    ctx.lineTo(centerX + circuitWidth / 2, centerY - circuitHeight / 2);
    
    // Right wire
    ctx.lineTo(centerX + circuitWidth / 2, centerY + circuitHeight / 2);
    
    // Bottom wire
    ctx.lineTo(centerX - circuitWidth / 2, centerY + circuitHeight / 2);
    
    // Left wire
    ctx.lineTo(centerX - circuitWidth / 2, centerY - circuitHeight / 2);
    
    ctx.stroke();

    // Battery (left side)
    const batteryX = centerX - circuitWidth / 2 - 10;
    const batteryY = centerY;
    
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(batteryX - 15, batteryY - 25, 30, 50);
    ctx.fillStyle = '#0ea5e9';
    ctx.fillRect(batteryX - 12, batteryY - 22, 24, 44);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`${state.voltage}V`, batteryX, batteryY + 4);

    // Resistor (top)
    const resistorX = centerX;
    const resistorY = centerY - circuitHeight / 2;
    
    ctx.fillStyle = '#f1f5f9';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.roundRect(resistorX - 40, resistorY - 15, 80, 30, 5);
    ctx.fill();
    ctx.stroke();
    
    // Resistor stripes
    const colors = ['#ef4444', '#f97316', '#eab308'];
    colors.forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.fillRect(resistorX - 25 + i * 15, resistorY - 12, 8, 24);
    });
    
    ctx.fillStyle = '#1e293b';
    ctx.font = '11px Inter';
    ctx.fillText(`${state.resistance}Ω`, resistorX, resistorY + 35);

    // Ammeter (right side)
    const ammeterX = centerX + circuitWidth / 2 + 10;
    const ammeterY = centerY;
    
    ctx.beginPath();
    ctx.arc(ammeterX, ammeterY, 25, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    ctx.fillStyle = '#0ea5e9';
    ctx.font = 'bold 10px Inter';
    ctx.fillText('A', ammeterX, ammeterY - 8);
    ctx.font = 'bold 11px Inter';
    ctx.fillStyle = '#1e293b';
    ctx.fillText(`${state.current.toFixed(3)}`, ammeterX, ammeterY + 8);

    // Current flow animation
    if (state.isRunning) {
      const time = Date.now() / 200;
      const flowSpeed = state.current * 50;
      
      for (let i = 0; i < 8; i++) {
        const t = ((time * flowSpeed + i * 50) % (circuitWidth * 2 + circuitHeight * 2));
        let x, y;
        
        if (t < circuitWidth) {
          x = centerX - circuitWidth / 2 + t;
          y = centerY - circuitHeight / 2;
        } else if (t < circuitWidth + circuitHeight) {
          x = centerX + circuitWidth / 2;
          y = centerY - circuitHeight / 2 + (t - circuitWidth);
        } else if (t < circuitWidth * 2 + circuitHeight) {
          x = centerX + circuitWidth / 2 - (t - circuitWidth - circuitHeight);
          y = centerY + circuitHeight / 2;
        } else {
          x = centerX - circuitWidth / 2;
          y = centerY + circuitHeight / 2 - (t - circuitWidth * 2 - circuitHeight);
        }
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#fbbf24';
        ctx.fill();
      }
    }

    // Labels
    ctx.fillStyle = '#64748b';
    ctx.font = '12px Inter';
    ctx.textAlign = 'left';
    ctx.fillText('Circuit Diagram', 20, 30);
    
  }, [state]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId: number;
    const animate = () => {
      drawCircuit(ctx, canvas.width, canvas.height);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [drawCircuit]);

  const handleVoltageChange = (value: number[]) => {
    const voltage = value[0];
    setState(prev => ({
      ...prev,
      voltage,
      current: calculateCurrent(voltage, prev.resistance),
    }));
  };

  const handleResistanceChange = (value: number[]) => {
    const resistance = value[0];
    setState(prev => ({
      ...prev,
      resistance,
      current: calculateCurrent(prev.voltage, resistance),
    }));
  };

  const toggleSimulation = () => {
    setState(prev => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const resetSimulation = () => {
    setState({
      voltage: 5,
      resistance: 100,
      current: 0.05,
      isRunning: false,
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 relative bg-muted/30 rounded-xl overflow-hidden border border-border">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full"
          style={{ minHeight: '300px' }}
        />
      </div>
      
      <div className="mt-4 space-y-4 p-4 bg-card rounded-xl border border-border">
        <div className="flex items-center gap-4">
          <Button 
            onClick={toggleSimulation}
            variant={state.isRunning ? "destructive" : "default"}
            className="gap-2"
          >
            {state.isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {state.isRunning ? 'Pause' : 'Run'}
          </Button>
          <Button variant="outline" onClick={resetSimulation} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center justify-between">
              <span>Voltage (V)</span>
              <span className="text-primary font-mono">{state.voltage} V</span>
            </label>
            <Slider
              value={[state.voltage]}
              onValueChange={handleVoltageChange}
              min={1}
              max={12}
              step={0.5}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center justify-between">
              <span>Resistance (Ω)</span>
              <span className="text-primary font-mono">{state.resistance} Ω</span>
            </label>
            <Slider
              value={[state.resistance]}
              onValueChange={handleResistanceChange}
              min={10}
              max={500}
              step={10}
              className="w-full"
            />
          </div>
        </div>

        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
          <p className="text-sm text-muted-foreground mb-1">Calculated Current (I = V/R)</p>
          <p className="text-2xl font-display font-bold text-primary">
            {state.current.toFixed(4)} A
            <span className="text-sm font-normal text-muted-foreground ml-2">
              ({(state.current * 1000).toFixed(2)} mA)
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
