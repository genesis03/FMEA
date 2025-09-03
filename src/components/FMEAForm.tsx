import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface FMEARow {
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

const initialRow: FMEARow = {
  id: '1',
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

export function FMEAForm() {
  const [rows, setRows] = useState<FMEARow[]>([initialRow]);

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
        
        // RPN 자동 계산
        if (field === 'severity' || field === 'occurrence' || field === 'detection') {
          updatedRow.rpn = updatedRow.severity * updatedRow.occurrence * updatedRow.detection;
        }
        
        // 새로운 RPN 자동 계산
        if (field === 'newSeverity' || field === 'newOccurrence' || field === 'newDetection') {
          updatedRow.newRpn = updatedRow.newSeverity * updatedRow.newOccurrence * updatedRow.newDetection;
        }
        
        return updatedRow;
      }
      return row;
    }));
  };

  const renderNumberSelect = (value: number, onChange: (value: number) => void) => (
    <Select value={value.toString()} onValueChange={(v) => onChange(parseInt(v))}>
      <SelectTrigger className="w-16">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
          <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <div className="p-6 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>FMEA 분석표</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[120px]">항목/기능</TableHead>
                  <TableHead className="min-w-[150px]">잠재적 고장모드</TableHead>
                  <TableHead className="min-w-[150px]">잠재적 고장영향</TableHead>
                  <TableHead className="w-16">심각도</TableHead>
                  <TableHead className="min-w-[150px]">잠재적 고장원인</TableHead>
                  <TableHead className="w-16">발생도</TableHead>
                  <TableHead className="min-w-[150px]">현재 설계관리</TableHead>
                  <TableHead className="w-16">검출도</TableHead>
                  <TableHead className="w-16">RPN</TableHead>
                  <TableHead className="min-w-[150px]">권장조치</TableHead>
                  <TableHead className="min-w-[120px]">책임자/목표일</TableHead>
                  <TableHead className="min-w-[150px]">조치내용</TableHead>
                  <TableHead className="w-16">새심각도</TableHead>
                  <TableHead className="w-16">새발생도</TableHead>
                  <TableHead className="w-16">새검출도</TableHead>
                  <TableHead className="w-16">새RPN</TableHead>
                  <TableHead className="w-16">작업</TableHead>
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
                      <div className="w-16 h-10 flex items-center justify-center bg-gray-100 rounded">
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
                      <div className="w-16 h-10 flex items-center justify-center bg-green-100 rounded">
                        {row.newRpn}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
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
              RPN = 심각도 × 발생도 × 검출도 (1-10점 척도)
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}