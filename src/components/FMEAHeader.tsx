import React from 'react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export interface FMEAHeaderData {
  company: string;
  productName: string;
  productNumber: string;
  modelYear: string;
  team: string;
  preparedBy: string;
  datePrepared?: Date;
  approvedBy: string;
  dateApproved?: Date;
  revision: string;
  page: string;
  fmeaType: 'DFMEA' | 'PFMEA';
}

export interface FMEAHeaderProps {
  headerData: FMEAHeaderData;
  setHeaderData: React.Dispatch<React.SetStateAction<FMEAHeaderData>>;
}

export function FMEAHeader({ headerData, setHeaderData }: FMEAHeaderProps) {
  
  const updateField = (field: keyof FMEAHeaderData, value: string | Date | undefined | 'DFMEA' | 'PFMEA') => {
    setHeaderData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 컬럼 1 */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="company">회사명 (Company)</Label>
              <Input
                id="company"
                value={headerData.company}
                onChange={(e) => updateField('company', e.target.value)}
                placeholder="회사명을 입력하세요"
              />
            </div>
            <div>
              <Label htmlFor="productName">제품/부품명 (Product/Part Name)</Label>
              <Input
                id="productName"
                value={headerData.productName}
                onChange={(e) => updateField('productName', e.target.value)}
                placeholder="제품 또는 부품명을 입력하세요"
              />
            </div>
            <div>
              <Label htmlFor="productNumber">제품/부품번호 (Product/Part Number)</Label>
              <Input
                id="productNumber"
                value={headerData.productNumber}
                onChange={(e) => updateField('productNumber', e.target.value)}
                placeholder="제품 또는 부품번호를 입력하세요"
              />
            </div>
            <div>
              <Label htmlFor="modelYear">모델연도 (Model Year)</Label>
              <Input
                id="modelYear"
                value={headerData.modelYear}
                onChange={(e) => updateField('modelYear', e.target.value)}
                placeholder="2024"
              />
            </div>
          </div>

          {/* 컬럼 2 */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="team">팀 (Team)</Label>
              <Input
                id="team"
                value={headerData.team}
                onChange={(e) => updateField('team', e.target.value)}
                placeholder="담당 팀명을 입력하세요"
              />
            </div>
            <div>
              <Label htmlFor="preparedBy">작성자 (Prepared By)</Label>
              <Input
                id="preparedBy"
                value={headerData.preparedBy}
                onChange={(e) => updateField('preparedBy', e.target.value)}
                placeholder="작성자명을 입력하세요"
              />
            </div>
            <div>
                <Label htmlFor="datePrepared">작성일 (Date Prepared)</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !headerData.datePrepared && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {headerData.datePrepared ? format(headerData.datePrepared, "PPP") : <span>날짜 선택</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={headerData.datePrepared}
                            onSelect={(date) => updateField('datePrepared', date)}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div>
              <Label htmlFor="approvedBy">승인자 (Approved By)</Label>
              <Input
                id="approvedBy"
                value={headerData.approvedBy}
                onChange={(e) => updateField('approvedBy', e.target.value)}
                placeholder="승인자명을 입력하세요"
              />
            </div>
          </div>

          {/* 컬럼 3 */}
          <div className="space-y-4">
            <div>
                <Label htmlFor="dateApproved">승인일 (Date Approved)</Label>
                 <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !headerData.dateApproved && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {headerData.dateApproved ? format(headerData.dateApproved, "PPP") : <span>날짜 선택</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={headerData.dateApproved}
                            onSelect={(date) => updateField('dateApproved', date)}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div>
              <Label htmlFor="revision">개정번호 (Revision)</Label>
              <Input
                id="revision"
                value={headerData.revision}
                onChange={(e) => updateField('revision', e.target.value)}
                placeholder="1.0"
              />
            </div>
            <div>
              <Label htmlFor="page">페이지 (Page)</Label>
              <Input
                id="page"
                value={headerData.page}
                onChange={(e) => updateField('page', e.target.value)}
                placeholder="1 of 1"
              />
            </div>
            {/* FMEA 유형 필드 다시 추가 */}
            <div>
              <Label htmlFor="fmeaType">FMEA 유형</Label>
               <Select
                value={headerData.fmeaType}
                onValueChange={(value: 'DFMEA' | 'PFMEA') => updateField('fmeaType', value)}
              >
                <SelectTrigger id="fmeaType">
                  <SelectValue placeholder="유형 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DFMEA">Design FMEA (DFMEA)</SelectItem>
                  <SelectItem value="PFMEA">Process FMEA (PFMEA)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

