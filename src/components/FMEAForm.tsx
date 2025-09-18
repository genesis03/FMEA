import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableRow } from './ui/table';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Plus, Trash2 } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';

export interface FMEARow {
  id: string;
  item: string;
  // function: string; // Python 예약어 충돌 방지를 위해 주석 처리 유지
  failureMode: string;
  effectsOfFailure: string;
  severity: number;
  classification: string;
  causesOfFailure: string;
  occurrence: number;
  currentControlsPrevention: string;
  currentControlsDetection: string;
  detection: number;
  rpn: number;
  recommendedActions: string;
  responsibility: string;
  targetDate: string;
  actionsTaken: string;
  completionDate: string;
  newSeverity: number;
  newOccurrence: number;
  newDetection: number;
  newRpn: number;
}

export interface FMEAFormProps {
  rows: FMEARow[];
  setRows: React.Dispatch<React.SetStateAction<FMEARow[]>>;
}

const initialRow: Omit<FMEARow, 'id'> = {
  item: '',
  // function: '', // Python 예약어 충돌 방지를 위해 주석 처리 유지
  failureMode: '',
  effectsOfFailure: '',
  severity: 1,
  classification: '',
  causesOfFailure: '',
  occurrence: 1,
  currentControlsPrevention: '',
  currentControlsDetection: '',
  detection: 1,
  rpn: 1,
  recommendedActions: '',
  responsibility: '',
  targetDate: '',
  actionsTaken: '',
  completionDate: '',
  newSeverity: 1,
  newOccurrence: 1,
  newDetection: 1,
  newRpn: 1,
};

export function FMEAForm({ rows, setRows }: FMEAFormProps) {
  const addRow = () => {
    const newRow = { ...initialRow, id: Date.now().toString() };
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
      <SelectTrigger className="w-12 h-9"><SelectValue /></SelectTrigger>
      <SelectContent>{[...Array(10).keys()].map(num => (<SelectItem key={num + 1} value={(num + 1).toString()}>{num + 1}</SelectItem>))}</SelectContent>
    </Select>
  );

  return (
    <Card>
      <CardHeader><CardTitle>FMEA 분석표</CardTitle></CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {/* 변경점: <Table> 컴포넌트가 thead와 TableBody를 모두 감싸도록 수정 */}
          <Table className="w-full border-collapse text-xs">
            <thead className="[&_tr]:border-b">
              <TableRow>
                <TableHead colSpan={13} className="p-1 align-middle"></TableHead>
                <TableHead colSpan={6} className="text-center p-1 align-middle border-b">조치 결과</TableHead>
              </TableRow>
              <TableRow>
                <TableHead className="p-1 align-middle min-w-[140px]">항목/기능</TableHead>
                <TableHead className="p-1 align-middle min-w-[140px]">고장 형태</TableHead>
                <TableHead className="p-1 align-middle min-w-[140px]">고장의 잠재적 영향</TableHead>
                <TableHead className="w-12 text-center p-1 align-middle">심각도</TableHead>
                <TableHead className="w-12 text-center p-1 align-middle">분류</TableHead>
                <TableHead className="p-1 align-middle min-w-[140px]">고장의 잠재적 원인</TableHead>
                <TableHead className="w-12 text-center p-1 align-middle">발생도</TableHead>
                <TableHead className="p-1 align-middle min-w-[140px]">현 설계관리 예방</TableHead>
                <TableHead className="p-1 align-middle min-w-[140px]">현 설계관리 검출</TableHead>
                <TableHead className="w-12 text-center p-1 align-middle">검출도</TableHead>
                <TableHead className="w-12 text-center p-1 align-middle">RPN</TableHead>
                <TableHead className="p-1 align-middle min-w-[140px]">권고조치</TableHead>
                <TableHead className="p-1 align-middle min-w-[140px]">책임자/목표일</TableHead>
                <TableHead className="p-1 align-middle min-w-[140px]">조치내용/완료일</TableHead>
                <TableHead className="w-12 text-center p-1 align-middle">심각도</TableHead>
                <TableHead className="w-12 text-center p-1 align-middle">발생도</TableHead>
                <TableHead className="w-12 text-center p-1 align-middle">검출도</TableHead>
                <TableHead className="w-12 text-center p-1 align-middle">RPN</TableHead>
                <TableHead className="w-12 text-center p-1 align-middle">작업</TableHead>
              </TableRow>
            </thead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="p-1 align-middle"><TextareaAutosize value={row.item} onChange={(e) => updateRow(row.id, 'item', e.target.value)} placeholder="항목/기능" className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[36px] resize-none" minRows={1}/></TableCell>
                  <TableCell className="p-1 align-middle"><TextareaAutosize value={row.failureMode} onChange={(e) => updateRow(row.id, 'failureMode', e.target.value)} placeholder="고장 형태" className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[36px] resize-none" minRows={1}/></TableCell>
                  <TableCell className="p-1 align-middle"><TextareaAutosize value={row.effectsOfFailure} onChange={(e) => updateRow(row.id, 'effectsOfFailure', e.target.value)} placeholder="고장의 잠재적 영향" className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[36px] resize-none" minRows={1}/></TableCell>
                  <TableCell className="p-1 align-middle">{renderNumberSelect(row.severity, (value) => updateRow(row.id, 'severity', value))}</TableCell>
                  <TableCell className="p-1 align-middle"><Input value={row.classification} onChange={(e) => updateRow(row.id, 'classification', e.target.value)} className="h-9 w-full text-center" maxLength={1}/></TableCell>
                  <TableCell className="p-1 align-middle"><TextareaAutosize value={row.causesOfFailure} onChange={(e) => updateRow(row.id, 'causesOfFailure', e.target.value)} placeholder="고장의 잠재적 원인" className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[36px] resize-none" minRows={1}/></TableCell>
                  <TableCell className="p-1 align-middle">{renderNumberSelect(row.occurrence, (value) => updateRow(row.id, 'occurrence', value))}</TableCell>
                  <TableCell className="p-1 align-middle"><TextareaAutosize value={row.currentControlsPrevention} onChange={(e) => updateRow(row.id, 'currentControlsPrevention', e.target.value)} placeholder="현 설계관리 예방" className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[36px] resize-none" minRows={1}/></TableCell>
                  <TableCell className="p-1 align-middle"><TextareaAutosize value={row.currentControlsDetection} onChange={(e) => updateRow(row.id, 'currentControlsDetection', e.target.value)} placeholder="현 설계관리 검출" className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[36px] resize-none" minRows={1}/></TableCell>
                  <TableCell className="p-1 align-middle">{renderNumberSelect(row.detection, (value) => updateRow(row.id, 'detection', value))}</TableCell>
                  <TableCell className="p-1 align-middle"><div className="w-full h-9 flex items-center justify-center bg-gray-100 rounded font-semibold">{row.rpn}</div></TableCell>
                  <TableCell className="p-1 align-middle"><TextareaAutosize value={row.recommendedActions} onChange={(e) => updateRow(row.id, 'recommendedActions', e.target.value)} placeholder="권고조치" className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[36px] resize-none" minRows={1}/></TableCell>
                  <TableCell className="p-1 align-middle"><div className="space-y-1"><Input value={row.responsibility} onChange={(e) => updateRow(row.id, 'responsibility', e.target.value)} placeholder="책임자" className="h-9"/><Input type="date" value={row.targetDate} onChange={(e) => updateRow(row.id, 'targetDate', e.target.value)} className="h-9"/></div></TableCell>
                  <TableCell className="p-1 align-middle"><div className="space-y-1"><TextareaAutosize value={row.actionsTaken} onChange={(e) => updateRow(row.id, 'actionsTaken', e.target.value)} placeholder="조치 내용" className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[36px] resize-none" minRows={1}/><Input type="date" value={row.completionDate} onChange={(e) => updateRow(row.id, 'completionDate', e.target.value)} placeholder="완료일" className="h-9"/></div></TableCell>
                  <TableCell className="p-1 align-middle">{renderNumberSelect(row.newSeverity, (value) => updateRow(row.id, 'newSeverity', value))}</TableCell>
                  <TableCell className="p-1 align-middle">{renderNumberSelect(row.newOccurrence, (value) => updateRow(row.id, 'newOccurrence', value))}</TableCell>
                  <TableCell className="p-1 align-middle">{renderNumberSelect(row.newDetection, (value) => updateRow(row.id, 'newDetection', value))}</TableCell>
                  <TableCell className="p-1 align-middle"><div className="w-full h-9 flex items-center justify-center bg-green-100 rounded font-semibold text-green-800">{row.newRpn}</div></TableCell>
                  <TableCell className="p-1 align-middle"><Button variant="destructive" size="icon" onClick={() => deleteRow(row.id)} disabled={rows.length === 1}><Trash2 className="w-4 h-4" /></Button></TableCell>
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