import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, Save, Download } from 'lucide-react';
import { toast } from 'sonner';

interface Observation {
  id: number;
  voltage: string;
  current: string;
  resistance: string;
}

export function ObservationPanel() {
  const [observations, setObservations] = useState<Observation[]>([
    { id: 1, voltage: '', current: '', resistance: '' },
  ]);

  const addRow = () => {
    const newId = Math.max(...observations.map(o => o.id), 0) + 1;
    setObservations([...observations, { id: newId, voltage: '', current: '', resistance: '' }]);
  };

  const removeRow = (id: number) => {
    if (observations.length > 1) {
      setObservations(observations.filter(o => o.id !== id));
    }
  };

  const updateObservation = (id: number, field: keyof Observation, value: string) => {
    setObservations(observations.map(o => {
      if (o.id === id) {
        const updated = { ...o, [field]: value };
        // Auto-calculate resistance if voltage and current are provided
        if ((field === 'voltage' || field === 'current') && updated.voltage && updated.current) {
          const v = parseFloat(updated.voltage);
          const i = parseFloat(updated.current);
          if (!isNaN(v) && !isNaN(i) && i > 0) {
            updated.resistance = (v / i).toFixed(2);
          }
        }
        return updated;
      }
      return o;
    }));
  };

  const handleSave = () => {
    const filledObservations = observations.filter(o => o.voltage && o.current);
    if (filledObservations.length === 0) {
      toast.error('Please add at least one observation');
      return;
    }
    toast.success(`Saved ${filledObservations.length} observations`);
  };

  const handleExport = () => {
    const csv = [
      'S.No,Voltage (V),Current (A),Resistance (Ω)',
      ...observations
        .filter(o => o.voltage && o.current)
        .map((o, i) => `${i + 1},${o.voltage},${o.current},${o.resistance}`)
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ohms_law_observations.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Observations exported');
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground">Observation Table</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExport} className="gap-1">
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
          <Button size="sm" onClick={handleSave} className="gap-1">
            <Save className="h-3.5 w-3.5" />
            Save
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left text-xs font-medium text-muted-foreground p-3 w-12">S.No</th>
              <th className="text-left text-xs font-medium text-muted-foreground p-3">Voltage (V)</th>
              <th className="text-left text-xs font-medium text-muted-foreground p-3">Current (A)</th>
              <th className="text-left text-xs font-medium text-muted-foreground p-3">Resistance (Ω)</th>
              <th className="w-12"></th>
            </tr>
          </thead>
          <tbody>
            {observations.map((obs, index) => (
              <tr key={obs.id} className="border-t border-border">
                <td className="p-3 text-sm text-muted-foreground">{index + 1}</td>
                <td className="p-2">
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="0.0"
                    value={obs.voltage}
                    onChange={(e) => updateObservation(obs.id, 'voltage', e.target.value)}
                    className="h-9"
                  />
                </td>
                <td className="p-2">
                  <Input
                    type="number"
                    step="0.001"
                    placeholder="0.000"
                    value={obs.current}
                    onChange={(e) => updateObservation(obs.id, 'current', e.target.value)}
                    className="h-9"
                  />
                </td>
                <td className="p-2">
                  <Input
                    type="text"
                    value={obs.resistance}
                    readOnly
                    className="h-9 bg-muted/50"
                    placeholder="Auto"
                  />
                </td>
                <td className="p-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRow(obs.id)}
                    disabled={observations.length === 1}
                    className="h-9 w-9 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3 border-t border-border">
        <Button variant="outline" size="sm" onClick={addRow} className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Add Row
        </Button>
      </div>
    </div>
  );
}
