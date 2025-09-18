import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from './ui/button';

// 부모 컴포넌트(App.tsx)와 주고받을 데이터 타입 정의
interface FmeaListItem {
  id: number;
  productName: string;
  fmeaNumber: string;
  datePrepared: string;
}

interface FMEAListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoad: (fmeaId: number) => void;
}

export function FMEAListDialog({ open, onOpenChange, onLoad }: FMEAListDialogProps) {
  const [fmeaList, setFmeaList] = useState<FmeaListItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 다이얼로그가 열릴 때마다 FMEA 목록을 불러옴
  useEffect(() => {
    if (open) {
      const fetchFmeaList = async () => {
        try {
          const response = await fetch('http://127.0.0.1:5000/api/fmea-list');
          if (!response.ok) {
            throw new Error('FMEA 목록을 불러오는 데 실패했습니다.');
          }
          const data = await response.json();
          setFmeaList(data);
          setError(null);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          }
        }
      };
      fetchFmeaList();
    }
  }, [open]);

  const handleLoadClick = (id: number) => {
    onLoad(id); // App.tsx에 있는 불러오기 함수 호출
    onOpenChange(false); // 다이얼로그 닫기
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>FMEA 불러오기</DialogTitle>
          <DialogDescription>
            저장된 FMEA 목록입니다. 불러올 항목을 선택하세요.
          </DialogDescription>
        </DialogHeader>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="max-h-[60vh] overflow-y-auto">
          <Table>
            <TableBody>
              {fmeaList.length > 0 ? (
                fmeaList.map((fmea) => (
                  <TableRow key={fmea.id}>
                    <TableCell className="font-medium">{fmea.productName || '(제품명 없음)'}</TableCell>
                    <TableCell>{fmea.fmeaNumber || '(번호 없음)'}</TableCell>
                    <TableCell className="text-right">{fmea.datePrepared}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => handleLoadClick(fmea.id)}>
                        불러오기
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    저장된 FMEA가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}