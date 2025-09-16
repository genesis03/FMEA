import React from 'react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

// FMEAHeaderData 인터페이스에 fmeaNumber 추가
export interface FMEAHeaderData {
  company: string;
  productName: string;
  productNumber: string;
  modelYear: string;
  team: string;
  preparedBy: string;
  datePrepared: string;
  approvedBy: string;
  dateApproved: string;
  revision: string;
  page: string;
  fmeaType: 'DFMEA' | 'PFMEA';
  fmeaNumber: string; // FMEA 번호 필드 추가
}

export interface FMEAHeaderProps {
  headerData: FMEAHeaderData;
  setHeaderData: React.Dispatch<React.SetStateAction<FMEAHeaderData>>;
}

export function FMEAHeader({ headerData, setHeaderData }: FMEAHeaderProps) {
  
  const updateField = (field: keyof FMEAHeaderData, value: string) => {
    setHeaderData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 컬럼 1 */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="company" className="mb-1.5 inline-block">회사명 (Company)</Label>
              <Input
                id="company"
                value={headerData.company}
                onChange={(e) => updateField('company', e.target.value)}
                placeholder="회사명을 입력하세요"
              />
            </div>
            <div>
              <Label htmlFor="productName" className="mb-1.5 inline-block">제품/부품명 (Product/Part Name)</Label>
              <Input
                id="productName"
                value={headerData.productName}
                onChange={(e) => updateField('productName', e.target.value)}
                placeholder="제품 또는 부품명을 입력하세요"
              />
            </div>
            <div>
              <Label htmlFor="productNumber" className="mb-1.5 inline-block">제품/부품번호 (Product/Part Number)</Label>
              <Input
                id="productNumber"
                value={headerData.productNumber}
                onChange={(e) => updateField('productNumber', e.target.value)}
                placeholder="제품 또는 부품번호를 입력하세요"
              />
            </div>
            <div>
              <Label htmlFor="modelYear" className="mb-1.5 inline-block">모델연도 (Model Year)</Label>
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
              <Label htmlFor="team" className="mb-1.5 inline-block">팀 (Team)</Label>
              <Input
                id="team"
                value={headerData.team}
                onChange={(e) => updateField('team', e.target.value)}
                placeholder="담당 팀명을 입력하세요"
              />
            </div>
            <div>
              <Label htmlFor="preparedBy" className="mb-1.5 inline-block">작성자 (Prepared By)</Label>
              <Input
                id="preparedBy"
                value={headerData.preparedBy}
                onChange={(e) => updateField('preparedBy', e.target.value)}
                placeholder="작성자명을 입력하세요"
              />
            </div>
            <div>
                <Label htmlFor="datePrepared" className="mb-1.5 inline-block">작성일 (Date Prepared)</Label>
                <Input
                    id="datePrepared"
                    type="date"
                    value={headerData.datePrepared}
                    onChange={(e) => updateField('datePrepared', e.target.value)}
                />
            </div>
            <div>
              <Label htmlFor="approvedBy" className="mb-1.5 inline-block">승인자 (Approved By)</Label>
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
              <Label htmlFor="fmeaNumber" className="mb-1.5 inline-block">FMEA 번호 (FMEA Number)</Label>
              <Input
                id="fmeaNumber"
                value={headerData.fmeaNumber}
                onChange={(e) => updateField('fmeaNumber', e.target.value)}
                placeholder="FMEA 번호를 입력하세요"
              />
            </div>
            <div>
                <Label htmlFor="dateApproved" className="mb-1.5 inline-block">승인일 (Date Approved)</Label>
                <Input
                    id="dateApproved"
                    type="date"
                    value={headerData.dateApproved}
                    onChange={(e) => updateField('dateApproved', e.target.value)}
                />
            </div>
            <div>
              <Label htmlFor="revision" className="mb-1.5 inline-block">개정번호 (Revision)</Label>
              <Input
                id="revision"
                value={headerData.revision}
                onChange={(e) => updateField('revision', e.target.value)}
                placeholder="1.0"
              />
            </div>
            <div>
              <Label htmlFor="page" className="mb-1.5 inline-block">페이지 (Page)</Label>
              <Input
                id="page"
                value={headerData.page}
                onChange={(e) => updateField('page', e.target.value)}
                placeholder="1 of 1"
              />
            </div>
            <div>
              <Label htmlFor="fmeaType" className="mb-1.5 inline-block">FMEA 유형</Label>
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

