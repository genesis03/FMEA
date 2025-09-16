import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Plus, Trash2 } from 'lucide-react';

// FMEARow 타입을 export하여 App.tsx에서도 사용할 수 있도록 합니다.
export interface FMEARow {
  id: string;
  item: string;
  function: string;
  failureMode: string;
  effectsOfFailure: string;
  severity: number;
  causesOfFailure: string;
  occurrence: number;
  currentControls: string;
  detection: number;
  rpn: number;
  recommendedActions: string;
  responsibility: string;
  targetDate: string;
  actionsTaken: string;
  newSeverity: number;
  newOccurrence: number;
  newDetection: number;
  newRpn: number;
}

// App.tsx로부터 받을 props의 타입을 정의합니다.
export interface FMEAFormProps {
  rows: FMEARow[];
  setRows: React.Dispatch<React.SetStateAction<FMEARow[]>>;
}

const initialRow: Omit<FMEARow, 'id'> = {
  item: '',
  function: '',
  failureMode: '',
  effectsOfFailure: '',
  severity: 1,
  causesOfFailure: '',
  occurrence: 1,
  currentControls: '',
  detection: 1,
  rpn: 1,
  recommendedActions: '',
  responsibility: '',
  targetDate: '',
  actionsTaken: '',
  newSeverity: 1,
  newOccurrence: 1,
  newDetection: 1,
  newRpn: 1,
};

// App.tsx로부터 rows와 setRows를 props로 전달받습니다.
export function FMEAForm({ rows, setRows }: FMEAFormProps) {

  const addRow = () => {
    const newRow = {
      ...initialRow,
      id: Date.now().toString(),
    };
    setRows([...rows, newRow]);
  };

  const deleteRow = (id: string) => {
    if (rows.length > 1) {
      setRows(rows.filter(row => row.id !== id));
    }
  };

  const updateRow = (id: string, field: keyof FMEARow, value: string | number) => {
    setRows(rows.map(row => {
      if (row.id === id) {
        const updatedRow = { ...row, [field]: value };
        
        if (['severity', 'occurrence', 'detection'].includes(field as string)) {
          updatedRow.rpn = updatedRow.severity * updatedRow.occurrence * updatedRow.detection;
        }
        
        if (['newSeverity', 'newOccurrence', 'newDetection'].includes(field as string)) {
          updatedRow.newRpn = updatedRow.newSeverity * updatedRow.newOccurrence * updatedRow.newDetection;
        }
        
        return updatedRow;
      }
      return row;
    }));
  };

  const renderNumberSelect = (value: number, onChange: (value: number) => void) => (
    <Select value={value.toString()} onValueChange={(v) => onChange(parseInt(v, 10))}>
      <SelectTrigger className="w-14">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {[...Array(10).keys()].map(num => (
          <SelectItem key={num + 1} value={(num + 1).toString()}>{num + 1}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>FMEA 분석표</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table className="w-full border-collapse">
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[150px] p-2 align-middle">항목/기능</TableHead>
                <TableHead className="min-w-[150px] p-2 align-middle">잠재적 고장모드</TableHead>
                <TableHead className="min-w-[150px] p-2 align-middle">잠재적 고장영향</TableHead>
                <TableHead className="w-14 text-center p-2 align-middle">심각도</TableHead>
                <TableHead className="min-w-[150px] p-2 align-middle">잠재적 고장원인</TableHead>
                <TableHead className="w-14 text-center p-2 align-middle">발생도</TableHead>
                <TableHead className="min-w-[150px] p-2 align-middle">현재 설계관리</TableHead>
                <TableHead className="w-14 text-center p-2 align-middle">검출도</TableHead>
                <TableHead className="w-14 text-center p-2 align-middle">RPN</TableHead>
                <TableHead className="min-w-[150px] p-2 align-middle">권장조치</TableHead>
                <TableHead className="min-w-[150px] p-2 align-middle">책임자/목표일</TableHead>
                <TableHead className="min-w-[150px] p-2 align-middle">조치내용</TableHead>
                <TableHead className="w-14 text-center p-2 align-middle">새심각도</TableHead>
                <TableHead className="w-14 text-center p-2 align-middle">새발생도</TableHead>
                <TableHead className="w-14 text-center p-2 align-middle">새검출도</TableHead>
                <TableHead className="w-14 text-center p-2 align-middle">새RPN</TableHead>
                <TableHead className="w-14 text-center p-2 align-middle">작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Textarea
                      value={row.item}
                      onChange={(e) => updateRow(row.id, 'item', e.target.value)}
                      placeholder="항목/기능"
                      className="min-h-[40px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Textarea
                      value={row.failureMode}
                      onChange={(e) => updateRow(row.id, 'failureMode', e.target.value)}
                      placeholder="잠재적 고장모드"
                      className="min-h-[40px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Textarea
                      value={row.effectsOfFailure}
                      onChange={(e) => updateRow(row.id, 'effectsOfFailure', e.target.value)}
                      placeholder="잠재적 고장영향"
                      className="min-h-[40px]"
                    />
                  </TableCell>
                  <TableCell>
                    {renderNumberSelect(row.severity, (value) => updateRow(row.id, 'severity', value))}
                  </TableCell>
                  <TableCell>
                    <Textarea
                      value={row.causesOfFailure}
                      onChange={(e) => updateRow(row.id, 'causesOfFailure', e.target.value)}
                      placeholder="잠재적 고장원인"
                      className="min-h-[40px]"
                    />
                  </TableCell>
                  <TableCell>
                    {renderNumberSelect(row.occurrence, (value) => updateRow(row.id, 'occurrence', value))}
                  </TableCell>
                  <TableCell>
                    <Textarea
                      value={row.currentControls}
                      onChange={(e) => updateRow(row.id, 'currentControls', e.target.value)}
                      placeholder="현재 설계관리"
                      className="min-h-[40px]"
                    />
                  </TableCell>
                  <TableCell>
                    {renderNumberSelect(row.detection, (value) => updateRow(row.id, 'detection', value))}
                  </TableCell>
                  <TableCell>
                    <div className="w-14 h-10 flex items-center justify-center bg-gray-100 rounded font-semibold">
                      {row.rpn}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Textarea
                      value={row.recommendedActions}
                      onChange={(e) => updateRow(row.id, 'recommendedActions', e.target.value)}
                      placeholder="권장조치"
                      className="min-h-[40px]"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <Input
                        value={row.responsibility}
                        onChange={(e) => updateRow(row.id, 'responsibility', e.target.value)}
                        placeholder="책임자"
                      />
                      <Input
                        type="date"
                        value={row.targetDate}
                        onChange={(e) => updateRow(row.id, 'targetDate', e.target.value)}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Textarea
                      value={row.actionsTaken}
                      onChange={(e) => updateRow(row.id, 'actionsTaken', e.target.value)}
                      placeholder="조치내용"
                      className="min-h-[40px]"
                    />
                  </TableCell>
                  <TableCell>
                    {renderNumberSelect(row.newSeverity, (value) => updateRow(row.id, 'newSeverity', value))}
                  </TableCell>
                  <TableCell>
                    {renderNumberSelect(row.newOccurrence, (value) => updateRow(row.id, 'newOccurrence', value))}
                  </TableCell>
                  <TableCell>
                    {renderNumberSelect(row.newDetection, (value) => updateRow(row.id, 'newDetection', value))}
                  </TableCell>
                  <TableCell>
                    <div className="w-14 h-10 flex items-center justify-center bg-green-100 rounded font-semibold text-green-800">
                      {row.newRpn}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => deleteRow(row.id)}
                      disabled={rows.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <Button onClick={addRow} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            행 추가
          </Button>
          
          <div className="text-sm text-muted-foreground">
            RPN = 심각도 × 발생도 × 검출도
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

